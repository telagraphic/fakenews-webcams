import nodeMarquee from './node-marquee.js';



const newsTickerFeed = document.querySelector('.news-ticker__container');

const news = async () => {
  // let response = await fetch('http://localhost:3000/api/fakenews');
  let response = await fetch('http://fakenewswebcams.com/api/fakenews');
  let data = await response.json();
  return data;
}

news()
  .then(data => {
    renderNewsPage(data.news);
    renderNewsTicker(data.news.ALL);
  })
  .catch(error => {
    new Error(error);
  });


function renderNewsPage(news) {

  for (const prop in news) {
    if (prop !== 'ALL') {
      // console.log(news[prop]);
    }
  }
}

function renderNewsTicker(news) {
  const newsTickerStories = '';
  const newsTickerElement = document.querySelector('.ticker__feed');

  let headlines = news.map(story => story.headline).join("\xa0\xa0\xa0\xa0\xa0");
  newsTickerElement.innerText = headlines;

  startNewsTicker();
}

function startNewsTicker() {
  if (window.innerWidth > 800) {
    nodeMarquee({
        selector: '.ticker__feed',
        speed: 3
    });
  } else {
    nodeMarquee({
        selector: '.ticker__feed',
        speed: 1.5
    });
  }
}
