// require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./server/api/routes');
const newsService = require('./server/services/newsService');
const path = require('path');

app.use('/api', routes);

app.use(express.static('public/pages'));
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/fonts'));
app.use(express.static('public/img'));

// app.set('views', __dirname + '/public/pages');
app.set('view engine', 'html');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serving on ${PORT}`));

app.get('/', async (req, res) => {
  let news = await newsService.getFakeNews();
  res.render('index');
});

app.get('/tv', async (req, res) => {
  res.sendFile('public/pages/tv.html');
});


// const expressHandlebars = require("express-handlebars");
// app.use(express.static(__dirname + '/public'));
// const hbs = expressHandlebars.create({
//   partialsDir: ["public/views/partials"],
//   extname: ".hbs",
//   layoutsDir: path.join(__dirname, "public/views/layouts"),
//   defaultLayout: path.join(__dirname, "public/views/layouts/main"),
//   helpers: {
//     formatDate: function(date) {
//       return dayjs(date).format('MM/DD/YYYY [@]h:mmA')
//     },
//     formatNumber: function(number) {
//       return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
//     }
//   }
// });
//
// app.set("view engine", "hbs");
// app.set('views', path.join(__dirname, "/public/views/pages"));
// app.engine( "hbs", hbs.engine);
