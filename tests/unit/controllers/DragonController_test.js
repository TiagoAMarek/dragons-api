var fixtures          = require('../fixtures'),
    DragonModel       = require('../../../models/DragonModel')(fixtures.mongoose),
    DragonController  = require('../../../controllers/DragonController')(DragonModel),
    assert            = require('assert'),
    debug             = require('debug')('dragons:test');

var request = {
  body: {},
  params: {},
  query: {}
};
var response = {
  status: function(code) {
    return {
      json: function json(obj) {
        debug('not mocked', obj);
      }
    };
  },
  json: function(obj) {
    debug('not mocked', obj);
  }
};

describe('DragonController', function () {
  it('#create', function() {
    request.body.name = 'Norberto';

    response.status = function(code) {
      return {
        json: function json(obj) {
          debug(obj);
          assert.deepEqual(obj, { _id: '5560d9109473a37d390dead1', __v: 0, name: 'Draco', type: 'Fire' });
        }
      };
    };

    DragonController.create(request, response, fixtures.next);
  });

  it('#retrieve', function() {
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, [ { name: 'Tiamat' }, { name: 'Banguela' } ]);
    };

    DragonController.retrieve(request, response, fixtures.next);
  });

  it('#retrieveOne', function() {
    request.params.slug = 'tiamat';
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, { name: 'Tiamat' });
    };

    DragonController.retrieveOne(request, response, fixtures.next);
  });

  it('#update', function() {
    request.params.slug = 'tiamat';
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, { ok: 1, nModified: 1, n: 1 });
    };

    DragonController.update(request, response, fixtures.next);
  });

  it('#delete', function() {
    request.params.slug = 'tiamat';
    response.json = function(obj) {
      debug(obj);
      assert.deepEqual(obj, { ok: 1, n: 1 });
    };

    DragonController.delete(request, response, fixtures.next);
  });
});//describe

