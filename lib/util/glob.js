'use strict';

const glob = require('glob');

module.exports = {
  sync: glob.sync,
  promise: function globPromise(src, options) {
    return new Promise((resolve, reject) => {
      glob(src, options || {}, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      })
    });
  }
};
