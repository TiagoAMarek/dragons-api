var mongojs = require('mongojs'),
    debug   = require('debug')('dragons:db'),
    config  = require('config');

'use strict';
function _connection() {
  var username  = config.get('mongo.username'),
      password  = config.get('mongo.password'),
      host      = config.get('mongo.host'),
      port      = config.get('mongo.port'),
      database  = config.get('mongo.database'),

      auth = username ? /* istanbul ignore next */ username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
};

var db = mongojs(_connection());
/* istanbul ignore next */
db.on('error', function(err) {
  debug(err);
});

module.exports = db;
