// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var Package = require('dgeni').Package;

module.exports = new Package('smeans', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/examples')
])

// .factory(require('./services/deployments/default'))
.factory(require('./services/deployments/debug'))

.processor(require('./processors/index-page'))

.config(function (dgeni, log, readFilesProcessor, writeFilesProcessor) {
  dgeni.stopOnValidationError = true;
  dgeni.stopOnProcessingError = true;

  log.level = 'info';

  readFilesProcessor.basePath = path.resolve(__dirname,'../..');
  readFilesProcessor.sourceFiles = [
    { include: 'src/**/*.js', basePath: 'src' }
  ];

  writeFilesProcessor.outputFolder = 'build';
})

.config(function (templateFinder, templateEngine) {
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };
})

.config(function (computePathsProcessor, computeIdsProcessor) {
  /* Ids */
  computeIdsProcessor.idTemplates.push({
    docTypes: ['indexPage'],
    getId: function(doc) { return doc.fileInfo.baseName; },
    getAliases: function(doc) { return [doc.id]; }
  });
  
  // /* Paths */
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

.config(function (generateIndexPagesProcessor, generateExamplesProcessor, generateProtractorTestsProcessor, defaultDeployment, debugDeployment) {
  generateIndexPagesProcessor.deployments = [defaultDeployment, debugDeployment];

  generateExamplesProcessor.deployments = [defaultDeployment];
  generateProtractorTestsProcessor.deployments = [defaultDeployment];
});