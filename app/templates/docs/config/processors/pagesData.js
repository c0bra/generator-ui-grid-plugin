'use strict';

var _ = require('lodash');

var AREA_NAMES = {
  api: 'API',
  tutorial: 'Tutorial'
};

module.exports = function generatePagesDataProcessor(log) {
  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      // We are only interested in docs that are
      //  1. In an area and
      //  2. NOT component groups
      //  3. Not modules (at least for now) (TODO?)
      var pages = _.filter(docs, function(doc) {
        return doc.area && doc.docType !== 'componentGroup' && doc.docType !== 'module';
      });

      var pageData = _.map(pages, function(page) {
        return _.pick(page, ['name', 'path', 'area', 'codeName', 'module', 'docType']);
      });

      var areas = _(pageData)
        .groupBy('area')
        .mapValues(function (value) {
          return {
            pages: value
          };
        })
        .forIn(function (value, key) {
          value.name = AREA_NAMES[key];
        })
        .value();

      docs.push({
        docType: 'pages-data',
        id: 'pages-data',
        name: 'PAGES',
        template: 'constant-data.template.js',
        outputPath: 'js/pages-data.js',
        items: areas
      });
    }
  };
};