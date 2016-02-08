var app     = require('../../app'),
    mongo   = require('../../db/mongo'),
    request = require('supertest'),
    assert  = require('assert'),
    debug   = require('debug')('dragons:test');

describe('Dragons Endpoint', function () {
  before(function(done) {
    var dragons = [
          { name: 'Tiamat', type: 'Hydra' },
          { name: 'Falkor', type: 'Cute' },
          { name: 'Charizard', type: 'Fire' }
        ];

    mongo.collection('dragons').insert(dragons, function(err, result) {
      done();
    });
  });
  afterEach(function(done) {
    mongo.collection('dragons').remove({}, done);
  });

  it('GET /api/dragons', function(done) {
    request(app)
      .get('/api/dragons')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, response) {
        var result = response.body;
        debug(err, result);

        assert.equal(result.items.length, 3);
        done();
      });
  });

  it('GET /api/dragons/:slug', function(done) {
    var mushu = { name: 'Mushu', type: 'Small', slug: 'mushu' };
    mongo.collection('dragons').insert(mushu, function(err, result) {
      var slug = 'mushu';

      request(app)
        .get('/api/dragons/' + slug)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, response) {
          var result = response.body;
          debug(err, result);

          delete result._id;
          assert.deepEqual(result, { name: 'Mushu', type: 'Small', slug: 'mushu', histories: [] });
          done();
        });
    });
  });

  it('GET /api/dragons/:slug not found', function(done) {
    var slug = 'not-found';

    request(app)
      .get('/api/dragons/' + slug)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, response) {
        var result = response.body;
        debug(err, result);

        assert.equal(response.statusCode, 404);
        done();
      });
  });

  it('POST /api/dragons', function(done) {
    var shenlong = { name: 'Shenlong', type: 'Chinese' };

    request(app)
      .post('/api/dragons')
      .send(shenlong)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, response) {
        var result = response.body;
        debug(err, result);

        assert.deepEqual(result.slug, 'shenlong');
        assert.deepEqual(result.histories, []);
        assert.ok(result._id);
        assert.ok(result.created_at);
        done();
      });
  });

  it('PUT /api/dragons/:slug', function(done) {
    var mushu = { name: 'Mushu', type: 'Small', slug: 'mushu' };
    mongo.collection('dragons').insert(mushu, function(err, result) {
      var slug = 'mushu';
      mushu.histories = ['Mulan'];

      request(app)
        .put('/api/dragons/' + slug)
        .send(mushu)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, response) {
          var result = response.body;
          debug(err, result);

          assert.deepEqual(result, { ok: 1, nModified: 1, n: 1 });
          done();
        });
    });
  });

  it('DELETE /api/dragons/:slug', function(done) {
    var mushu = { name: 'Mushu', type: 'Small', slug: 'mushu' };
    mongo.collection('dragons').insert(mushu, function(err, result) {
      var slug = 'mushu';

      request(app)
        .delete('/api/dragons/' + slug)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, response) {
          var result = response.body;
          debug(err, result);

          assert.deepEqual(result, { ok: 1, n: 1 });
          done();
        });
    });
  });
});//describe
