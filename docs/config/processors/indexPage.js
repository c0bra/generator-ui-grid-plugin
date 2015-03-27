'use strict';

var _ = require('lodash');
var path = require('canonical-path');

module.exports = function generateIndexPagesProcessor(log) {
  return {
    name: 'index-page',
    deployments: [],
    $validate: {
      deployments: { presence: true }
    },
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    description: 'Create documentation index page',
    template: 'indexPage.template.html',
    $process: function(docs) {
      this.deployments.forEach(function(deployment) {
        var indexDoc = _.defaults({
          docType: 'indexPage',
        }, deployment);

        indexDoc.id = 'index' + (deployment.name === 'default' ? '' : '-' + deployment.name);

        docs.push(indexDoc);
      });
    }
  };
};