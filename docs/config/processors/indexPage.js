var buildConfig = require('../../../config/build.config');

module.exports = function indexPageProcessor(log) {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {
    docs.push({
      docType: 'indexPage',
      template: 'index.template.html',
      outputPath: 'index.html',
      path: 'index.html',
      buildConfig: buildConfig
    });
  }
};