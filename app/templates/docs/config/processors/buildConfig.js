'use strict';

var q = require('q');
var exec = require('child-proc').exec;

var buildConfig = require('../../../config/build.config');

module.exports = function buildConfigProcessor(log) {
  return {
    $runBefore: ['rendering-docs'],
    $runAfter: ['indexPageProcessor'],
    $process: process
  };

  function process(docs) {
    docs.push({
      name: 'BUILDCONFIG',
      template: 'constant-data.template.js',
      outputPath: 'js/build-config.js',
      items: buildConfig
    });

    return q.all([ getSHA(), getCommitDate(), getCurrentTag(), versionTagExists(buildConfig.version) ])
      .then( function() {
        return docs;
      });
  }

  /**
  * Git the SHA associated with the most recent commit on origin/master
  * @param deferred
  * @returns {*}
  */
  function getSHA() {
    var deferred = q.defer();

    exec('git rev-parse HEAD', function (error, stdout, stderr) {
      buildConfig.commit = stdout && stdout.toString().trim();
      deferred.resolve(buildConfig.commit);
    });

    return deferred.promise;
  }

  /**
   * Get the commit date for the most recent commit on origin/master
   * @param deferred
   * @returns {*}
   */
  function getCommitDate() {
    var deferred = q.defer();

    exec('git show -s --format=%ci HEAD', function (error, stdout, stderr) {
      buildConfig.date = stdout && stdout.toString().trim();
      deferred.resolve(buildConfig.date);
    });

    return deferred.promise;
  }

  /**
   * Get the current tag, if any
   */
  function getCurrentTag() {
    var deferred = q.defer();

    exec('git tag -l --points-at HEAD', function (error, stdout, stderr) {
      buildConfig.tag = stdout && stdout.toString().trim();
      deferred.resolve(buildConfig.tag);
    });

    return deferred.promise;
  }

  // Boolean switch for whether a git tag exists for the version in package.json already or not
  function versionTagExists(tag) {
    var deferred = q.defer();

    exec('git rev-parse ' + tag, function (error, stdout, stderr) {
      if (error) {
        buildConfig.versionTagExists = false;
      }
      else {
        buildConfig.versionTagExists = true;
      }
      deferred.resolve(buildConfig.versionTagExists);
    });

    return deferred.promise;
  }
}