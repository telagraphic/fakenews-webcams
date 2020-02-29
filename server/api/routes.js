const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');

// curl http://localhost:3000/api/fakenews
// router.get('/fakenews', stories.getFakeNews);

module.exports = router;
