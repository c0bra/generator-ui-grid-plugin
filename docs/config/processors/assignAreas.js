'use strict';

var _ = require('lodash');

module.exports = function assignAreasProcessor(log) {
  return {
    $runAfter: ['tags-extracted'],
    $runBefore: ['processing-docs'],
    $process: function(docs) {
      docs.forEach(function (doc) {
        if (doc.docType === 'js') {
          doc.area = 'api';
        }
        else if (doc.docType === 'content') {
          doc.area = 'tutorial';
        }
      });
    }
  };
};