const express = require('express');
const router = express.Router();
const newsService = require('../services/newsService');

// curl http://localhost:3000/api/fakenews
router.get('/fakenews', async (req, res) => {
  const news = await newsService.getFakeNews();
  res.status(200).json({ news: news});
});

module.exports = router;
