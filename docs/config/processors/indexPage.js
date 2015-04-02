'use strict';

var _ = require('lodash');

var buildConfig = require('../../../config/build.config');

module.exports = function indexPageProcessor(log) {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {
    var indexDoc = {
      docType: 'indexPage',
      template: 'index.template.html',
      outputPath: 'index.html',
      path: 'index.html',
      buildConfig: buildConfig
    };

    // Pipe references to the other docs into the index page
    indexDoc.areas = _(docs)
      .groupBy('area')
      .value();

    docs.push(indexDoc);
  }
};