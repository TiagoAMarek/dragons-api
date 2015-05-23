var dragons = require('./dragons.json'),
    request = require('request'),
    debug   = require('debug')('dragons:seed');

const API = 'https://dragons-api.herokuapp.com/api/dragons';
// const API = 'http://localhost:8080/api/dragons';

dragons.forEach(function(dragon) {
  request.post({ url: API, form: dragon }, function(err,httpResponse,body) {
    debug(err, body);
  });
});
