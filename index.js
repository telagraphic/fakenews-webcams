// require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./server/api/routes');
const newsService = require('./server/services/newsService');
const path = require('path');
const expressHandlebars = require("express-handlebars");

app.use('/api', routes);

app.use(express.static(__dirname + '/public'));

const hbs = expressHandlebars.create({
  partialsDir: ["public/views/partials"],
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "public/views/layouts"),
  defaultLayout: path.join(__dirname, "public/views/layouts/main"),
  helpers: {
    formatDate: function(date) {
      return dayjs(date).format('MM/DD/YYYY [@]h:mmA')
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
  let news = await newsService.getFakeNews();
  console.log(news);
  res.send(news);
  // res.render('index', { cnn: news.CNN, fox: news.FOX });
});
