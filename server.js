// require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./server/api/routes');
const newsService = require('./server/services/newsService');
const path = require('path');
const exphbs = require('express-handlebars');

app.use('/api', routes);

app.use(express.static('public'));
app.use(express.static('public/pages'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/fonts'));
app.use(express.static('public/img'));

const hbs = exphbs.create({
  partialsDir: ["public/views/partials"],
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  defaultLayout: path.join(__dirname, "public/views/layouts/main"),
  helpers: {
    toJSON: function(data) {
      return JSON.stringify(data);
    },
    formatNumber: function(number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
});

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, "/public/views/pages"));
app.engine( "hbs", hbs.engine);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', async (req, res) => {
  const news = await newsService.getFakeNews();
  res.render('reader', {ticker: news.ZEROHEDGE, CNN: news.CNN, FOX: news.FOX, RT: news.RT});
});

app.get('/tv', async (req, res) => {
  const news = await newsService.getFakeNews();
  res.render('tv', {ticker: news.ZEROHEDGE});
});
