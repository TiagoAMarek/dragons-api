'use strict';
var debug   = require('debug')('dragons:fixtures'),
    assert  = require('assert');

function _model() {}
_model.prototype.save = function(callback) {
  callback(null, { "_id": "5560d9109473a37d390dead1", "__v": 0, "name": "Draco", "type": "Fire" });
};
_model.find = function(query) {
  return {
    exec: function(callback){
      callback(null, [{ name: 'Tiamat' }, { name: 'Banguela' }]);
    }
  };
};
_model.findOne = function(query) {
  return {
    exec: function(callback){
      if (query.slug === 'not-found') {
        callback(null, null);
      } else {
        callback(null, { name: 'Tiamat' });
      }
    }
  };
};
_model.update = function() {
  return {
    exec: function(callback){
      callback(null, {"ok": 1, "nModified": 1, "n": 1 });
    }
  };
};
_model.remove = function() {
  return {
    exec: function(callback){
      callback(null, {"ok": 1, "n": 1 });
    }
  };
};
var fixtures = {
  mongoose: {
    model: function(name, schema) {
      return _model;
    }
  },
  next: function(err) {
    debug('catch err', err);
    assert.deepEqual(err, {});
  }
};
module.exports = fixtures;
