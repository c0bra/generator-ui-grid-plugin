// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var buildConfig = require('../../config/build.config');
var projectPath = path.resolve(__dirname, '../..');
var packagePath = __dirname;

var Package = require('dgeni').Package;

module.exports = new Package(buildConfig.name, [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
])

// .processor(require('./processors/assignAreas'))
.processor(require('./processors/indexPage'))
.processor(require('./processors/buildConfig'))

.config(function (readFilesProcessor, writeFilesProcessor) {
  readFilesProcessor.basePath = projectPath

  readFilesProcessor.sourceFiles = [
    { include: 'src/**/*.js', basePath: 'src' }
  ];

  writeFilesProcessor.outputFolder = '.tmp/docs';
})

.config(function (templateFinder, templateEngine) {
  templateFinder.templateFolders = [
    path.resolve(packagePath, 'template')
  ];

  templateFinder.templatePatterns = [
    '${doc.template}',
    'common.template.html'
  ];
})

.config(function (computePathsProcessor, computeIdsProcessor) {
  // IDs
  computeIdsProcessor.idTemplates.push({
    docTypes: ['indexPage'],
    getId: function(doc) { return '${fileInfo.baseName}' },
    getAliases: function(doc) { return [doc.id]; }
  });

  // Paths
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
})

;