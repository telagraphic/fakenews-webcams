// require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', function(req, res) {
  res.send('Fakenews Webcams 2.0: Coming Soon!')
});
