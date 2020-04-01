barba.use(barbaCss);
barba.init();

const testUrl = 'http://localhost:3000/api/fakenews';
const prodUrl = '/api/fakenews';

const news = async () => {
  let response = await fetch(prodUrl);
  let data = await response.json();
  return data;
}

news()
  .then(data => {
    renderNewsTicker(data.news.ALL);
  })
  .catch(error => {
    new Error(error);
  });


function renderNewsTicker(news) {
  const newsTickerStories = '';
  const newsTickerElement = document.querySelector('.ticker__feed');

  let headlines = news.map(story => story.headline).join("\xa0\xa0\xa0\xa0\xa0");
  newsTickerElement.innerText = headlines;

  startNewsTicker();
}


function setupNewsTicker() {
  document.addEventListener('DOMContentLoaded', function() {
    startNewsTicker();
  });
}

function startNewsTicker() {
  if (window.innerWidth > 800) {
    const ticker = nodeMarquee({selector: '.ticker__feed', speed: 3});
    ticker.play();
  } else {
    const ticker = nodeMarquee({selector: '.ticker__feed', speed: 1.5});
    ticker.play();
  }
}
