var app     = require('../../app'),
    request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('dragons:test');

describe('Main Endpoints', function () {
  it('GET / returns `LIVE`', function(done) {
    request(app)
      .get('/')
      .end(function(err, response) {
        var result = response.text;
        debug(err, result);

        assert.ok(result);
        done();
      });
  });

  it('GET /api returns `LIVE`', function(done) {
    request(app)
      .get('/api')
      .end(function(err, response) {
        var result = response.text;
        debug(err, result);

        assert.equal(result, 'LIVE');
        done();
      });
  });

  it('GET /notfound returns statusCode 404', function(done) {
    request(app)
      .get('/notFound')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        var statusCode = response.statusCode;
        debug(err, statusCode);

        assert.equal(statusCode, 404);
        done();
      });
  });
});//describe
