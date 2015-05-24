'use strict';
var express         = require('express'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    swig            = require('swig'),
    debug           = require('debug')('dragons:app'),
    app             = express();

// config
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (request, response, next) {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.end('');
  } else {
    next();
  }
});

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/', require('./routes'));


// errors
app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, request, response, next) {
  response
    .status(err.status || 500)
    .render('error', {
      message: err.message,
      error: {}
    });
  debug(err);
});


// server
module.exports = app;
