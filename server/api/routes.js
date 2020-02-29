var express = require('express');
var router = express.Router();
var stories = require('../services/stories');

// curl http://localhost:3000/api/fakenews
// router.get('/fakenews', stories.getFakeNews);

module.exports = router;
