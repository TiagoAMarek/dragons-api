'use strict';
var debug = require('debug')('dragons:model'),
    slug  = require('slug');

function DragonDAO(model) {
  this.model = model;
}

DragonDAO.prototype.insert = function(data, callback) {
  data.created_at = new Date();
  data.slug = slug(data.name).toLowerCase();

  var model = new this.model(data);
  model.save(function(err, result) {
    callback(err, result);
  });
};

DragonDAO.prototype.find = function(query, callback) {
  this.model.find(query).exec(callback);
};

DragonDAO.prototype.findOne = function(query, callback) {
  this.model.findOne(query).exec(callback);
};

DragonDAO.prototype.update = function(query, data, callback) {
  data.updated_at = new Date();
  data.slug = slug(data.name).toLowerCase();

  this.model.update(query, data).exec(function(err, result) {
    callback(err, result);
  });
};

DragonDAO.prototype.remove = function(query, callback) {
  this.model.remove(query).exec(function(err, result) {
    callback(err, result);
  });
};

module.exports = function(mongoose) {
  var Dragon = mongoose.model('Dragon', {
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,

    name:       String,
    type:       String,
    slug:       String,
    histories: [String]
  });

  return new DragonDAO(Dragon);
};
