'use strict';
var _Promise = require('bluebird');

function DragonController(DAO) {
  this.DAO = _Promise.promisifyAll(DAO);
}

DragonController.prototype.create = function(request, response, next) {
  this.DAO.insertAsync(request.body).then(function(result) {
    response.status(201).json(result);
  })
  .catch(next);
};

DragonController.prototype.retrieve = function(request, response, next) {
  this.DAO.findAsync({}).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.retrieveOne = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.findOneAsync({ slug: slug }).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.update = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.updateAsync({ slug: slug }, request.body).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

DragonController.prototype.delete = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.removeAsync({ slug: slug }).then(function(result) {
    response.json(result);
  })
  .catch(next);
};

module.exports = function(DAO) {
  return new DragonController(DAO);
};
