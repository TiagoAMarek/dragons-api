'use strict';

var express = require('express'),
    router  = express.Router();

var mongoose          = require('../db/mongoose'),
    DragonModel       = require('../models/DragonModel')(mongoose),
    DragonController  = require('../controllers/DragonController')(DragonModel);

router.get('/', function(request, response, next) {
  response.send('LIVE');
});

router.post   ('/dragons', DragonController.create.bind(DragonController));
router.get    ('/dragons', DragonController.retrieve.bind(DragonController));
router.get    ('/dragons/:slug', DragonController.retrieveOne.bind(DragonController));
router.put    ('/dragons/:slug', DragonController.update.bind(DragonController));
router.delete ('/dragons/:slug', DragonController.delete.bind(DragonController));

module.exports = router;
