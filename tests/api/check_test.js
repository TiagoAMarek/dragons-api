var app     = require('../../app'),
    request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('dragons:test');

describe('Check Endpoints', function () {
  it('GET /check/version', function(done) {
    request(app)
      .get('/check/version')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        var result = response.body;
        debug(err, result);

        assert.deepEqual(result, {"applicationName":"dragons-api","versionDate":"2015-05-23 20:59","versionRelease":"0.0.1"});
        done();
      });
  });

  it('GET /check/status/complete', function(done) {
    request(app)
      .get('/check/status/complete')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        var result = response.body;
        debug(err, result);

        assert.equal(result.applicationName, 'dragons-api');
        done();
      });
  });
});//describe
