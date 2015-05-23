'use strict';
var Promise = require('bluebird');

function DragonController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

DragonController.prototype.create = function(request, response, next) {
  this.Model.insertAsync(request.body).then(function(result) {
    response.status(201).json(result);
  })
  .catch(next);
};

DragonController.prototype.retrieve = function(request, response, next) {
  this.Model.findAsync({}).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.retrieveOne = function(request, response, next) {
  var slug = request.params.slug;

  this.Model.findOneAsync({ slug: slug }).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.update = function(request, response, next) {
  var slug = request.params.slug;

  this.Model.updateAsync({ slug: slug }, request.body).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.delete = function(request, response, next) {
  var slug = request.params.slug;

  this.Model.removeAsync({ slug: slug }).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

module.exports = function(Model) {
  return new DragonController(Model);
};
