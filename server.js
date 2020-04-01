const express = require('express');
const app = express();
const routes = require('./server/api/routes');
const newsService = require('./server/services/newsService');
const path = require('path');
const exphbs = require('express-handlebars');
const cors = require('cors');

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

const corsOptions = {
  origin: 'http://fakenewswebcams.com',
  // origin: 'http://localhost:3000',
  method: 'GET',
  optionsSuccessStatus: 200
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://fakenewswebcams.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.use('/api', routes);

app.get('/', async (req, res) => {
  const news = await newsService.getFakeNews();

  res.render('reader', {
    ticker: news.ALL,
    CNN_HEADLINE: news.CNN_HEADLINE,
    CNN_STORIES: news.CNN_STORIES,
    FOX_HEADLINE: news.FOX_HEADLINE,
    FOX_STORIES: news.FOX_STORIES,
    RT_HEADLINE: news.RT_HEADLINE,
    RT_STORIES: news.RT_STORIES,
    NYTIMES_HEADLINE: news.NYTIMES_HEADLINE,
    NYTIMES_STORIES: news.NYTIMES_STORIES,
    BREITBART_HEADLINE: news.BREITBART_HEADLINE,
    BREITBART_STORIES: news.BREITBART_STORIES,
    INFOWARS_HEADLINE: news.INFOWARS_HEADLINE,
    INFOWARS_STORIES: news.INFOWARS_STORIES,
    POLITICO_HEADLINE: news.POLITICO_HEADLINE,
    POLITICO_STORIES: news.POLITICO_STORIES,
    ZEROHEDGE_HEADLINE: news.ZEROHEDGE_HEADLINE,
    ZEROHEDGE_STORIES: news.ZEROHEDGE_STORIES,
    BLOOMBERG_HEADLINE: news.BLOOMBERG_HEADLINE,
    BLOOMBERG_STORIES: news.BLOOMBERG_STORIES
  });
});

app.get('/tv', async (req, res) => {
  const news = await newsService.getFakeNews();
  res.render('tv', {ticker: news.ALL});
});
