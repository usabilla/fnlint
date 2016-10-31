'use strict';

const _ = require('lodash');

module.exports = function mapPromise(collection, iteratee) {
  return new Promise((resolve, reject) => {
    let promises = _.map(collection, function() {
      return Promise.resolve(iteratee.apply(null, arguments)).catch(reject);
    });
    Promise.all(promises)
      .then(resolve);
  });
};
