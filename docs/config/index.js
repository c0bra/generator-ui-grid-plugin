// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var buildConfig = require('../../config/build.config');
var projectPath = path.resolve(__dirname, '../..');
var packagePath = __dirname;

var Package = require('dgeni').Package;

module.exports = new Package(buildConfig.name, [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks'),
  require('dgeni-packages/examples')
])

.config(function (log) {
  log.level = 'info';
})

.factory(require('./services/deployments/default'))
.factory(require('./services/deployments/debug'))

.processor(require('./processors/assignAreas'))
.processor(require('./processors/pagesData'))
.processor(require('./processors/indexPage'))
.processor(require('./processors/buildConfig'))

.config(function (readFilesProcessor, writeFilesProcessor) {
  readFilesProcessor.basePath = projectPath

  readFilesProcessor.sourceFiles = [
    { include: 'src/**/*.js', basePath: 'src' },
    { include: 'docs/content/**/*.md', basePath: 'docs/content', fileReader: 'ngdocFileReader' }
  ];

  writeFilesProcessor.outputFolder = '.tmp/docs';
})

.config(function (templateFinder, templateEngine) {
  templateFinder.templateFolders.unshift(path.resolve(packagePath, 'template'));

  // templateFinder.templatePatterns = [
  //   '${doc.template}',
  //   'common.template.html'
  // ];
})

.config(function (computePathsProcessor, computeIdsProcessor) {
  /* Index page */
  computeIdsProcessor.idTemplates.push({
    docTypes: ['indexPage'],
    getId: function(doc) { return '${fileInfo.baseName}' },
    getAliases: function(doc) { return [doc.id]; }
  });
  
  computePathsProcessor.pathTemplates.push({
    docTypes: ['indexPage'],
    getPath: function() {},
    outputPathTemplate: '${id}.html'
  });


  // Put jsdoc files in ./partials directory
  computePathsProcessor.pathTemplates.push({
    docTypes: ['js'],
    pathTemplate: '${id}',
    outputPathTemplate: 'partials/${path}.html'
  });


  /* Content files */
  computeIdsProcessor.idTemplates.push({
    docTypes: ['content'],
    idTemplate: 'content-${fileInfo.relativePath.replace("/","-")}',
    getAliases: function(doc) { return [doc.id]; }
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['content'],
    getPath: function(doc) {
      var docPath = path.dirname(doc.fileInfo.relativePath);
      if ( doc.fileInfo.baseName !== 'index' ) {
        docPath = path.join(docPath, doc.fileInfo.baseName);
      }
      return docPath;
    },
    getOutputPath: function(doc) {
      return path.join(
        'partials',
        path.dirname(doc.fileInfo.relativePath),
        doc.fileInfo.baseName) + '.html';
    }
  });
})

.config(function(generateExamplesProcessor, generateProtractorTestsProcessor, defaultDeployment, debugDeployment) {
  var deployments = [
    defaultDeployment,
    debugDeployment
  ];

  generateExamplesProcessor.deployments = deployments;
  generateProtractorTestsProcessor.deployments = deployments;
});

;