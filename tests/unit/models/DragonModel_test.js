var fixtures    = require('../fixtures'),
    DragonModel = require('../../../models/DragonModel')(fixtures.mongoose),
    assert      = require('assert'),
    debug       = require('debug')('dragons:test');

describe('DragonModel', function () {
  it('#insert', function(done) {
    DragonModel.insert({ name: 'Draco', type: 'Fire' }, function(err, result) {
      debug(result);
      assert.deepEqual(result, { _id: '5560d9109473a37d390dead1', __v: 0, name: 'Draco', type: 'Fire' });
      done();
    });
  });

  it('#find', function(done) {
    DragonModel.find({}, function(err, result) {
      debug(result);
      assert.equal(result.length, 2);
      done();
    });
  });

  it('#findOne', function(done) {
    DragonModel.findOne({ name: 'Tiamat' }, function(err, result) {
      debug(result);
      assert.equal(result.name, 'Tiamat');
      done();
    });
  });

  it('#update', function(done) {
    DragonModel.update({ name: 'Banguela' }, { name: 'Toothless' }, function(err, result) {
      debug(result);
      assert.deepEqual(result, {"ok": 1, "nModified": 1, "n": 1 });

      done();
    });
  });

  it('#remove', function(done) {
    DragonModel.remove({ name: 'Banguela' }, function(err, result) {
      debug(result);
      assert.deepEqual(result, {"ok": 1, "n": 1 });

      done();
    });
  });
});//describe

