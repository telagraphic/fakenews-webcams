import nodeMarquee from './node-marquee.js';

const news = async () => {
  let response = await fetch('http://localhost:3000/api/fakenews');
  let data = await response.json();
  return data;
}

news()
  .then(data => {
    renderNewsTicker(data.news.ZEROHEDGE);
  })
  .catch(error => {
    new Error(error);
  });


function renderNewsTicker(news) {
  const newsTickerStories = '';
  const newsTickerElement = document.querySelector('.ticker__feed');

  let headlines = news.map(story => story.headline).join("\xa0\xa0\xa0\xa0\xa0");
  newsTickerElement.innerText = headlines;
}

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
