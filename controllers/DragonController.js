'use strict';
var debug     = require('debug')('dragons:model'),
    _Promise  = require('bluebird');

const PAGE_SIZE = 10;

function DragonController(DAO) {
  this.DAO = _Promise.promisifyAll(DAO);
}

DragonController.prototype.create = function(request, response, next) {
  this.DAO.insertAsync(request.body)
    .then(function(result) {
      response.status(201).json(result);
    })
    .catch(next);
};

DragonController.prototype.retrieve = function(request, response, next) {
  let page = parseInt(request.query.page || 0, 10);
  let size = parseInt(request.query.size, 10) || PAGE_SIZE;
  let skip = page * PAGE_SIZE;
  let query = {};

    _Promise.all([
      this.DAO.countAsync(query),
      this.DAO.paginatedAsync(query, { size, skip })
    ])
    .then(function(result) {
      response.json({
        items: result[1],
        _metadata: {
          page: page,
          per_page: size,
          page_count: result[1].length,
          total_count: result[0]
        }
      });
    })
    .catch(next);
};

DragonController.prototype.retrieveOne = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.findOneAsync({ slug: slug })
    .then(_handleResult)
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
};

DragonController.prototype.update = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.updateAsync({ slug: slug }, request.body)
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
};

DragonController.prototype.delete = function(request, response, next) {
  var slug = request.params.slug;

  this.DAO.removeAsync({ slug: slug })
    .then(function(result) {
      response.json(result);
    })
    .catch(next);
};

module.exports = function(DAO) {
  return new DragonController(DAO);
};

/**
 * privates
 */

function _handleResult(result) {
  if (result === null) {
    var err = new Error('Dragon not found');
    err.status = 404;
    throw(err);
  }
  return result;
}
