'use strict';

var express = require('express'),
    router  = express.Router();

var mongoose          = require('../db/mongoose'),
    DragonModel       = require('../models/DragonModel')(mongoose),
    DragonController  = require('../controllers/DragonController')(DragonModel);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Docs - Dragons API' });
});

router.get('/api', function(req, res, next) {
  res.send('LIVE');
});

router.post   ('/api/dragons', DragonController.create.bind(DragonController));
router.get    ('/api/dragons', DragonController.retrieve.bind(DragonController));
router.get    ('/api/dragons/:slug', DragonController.retrieveOne.bind(DragonController));
router.put    ('/api/dragons/:slug', DragonController.update.bind(DragonController));
router.delete ('/api/dragons/:slug', DragonController.delete.bind(DragonController));

module.exports = router;
