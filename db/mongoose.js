var mongoose  = require('mongoose'),
    debug     = require('debug')('dragons:db'),
    config    = require('config');

'use strict';
var db;

function _connection() {
  var username  = config.get('mongo.username'),
      password  = config.get('mongo.password'),
      host      = config.get('mongo.host'),
      port      = config.get('mongo.port'),
      database  = config.get('mongo.database'),

      auth = username ? username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
}

mongoose.connect(_connection());
db = mongoose.connection;

db.on('error', function(err) {
  debug(err);
});

db.once('open', function (callback) {
  debug('connected to mongodb');
});

module.exports = mongoose;
