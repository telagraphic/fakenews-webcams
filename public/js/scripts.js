import nodeMarquee from './node-marquee.js';
nodeMarquee({
    selector: '.news-ticker',
    speed: 3
});


const news = async () => {
  let response = await fetch('http://localhost:3000/api/fakenews');
  let data = await response.json();
  return data;
}

news()
  .then(data => {
    // console.log(data.news.ALL);
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

const newsTickerStories = [];

function renderNewsTicker(news) {
  news.forEach(story => {
    // newsTickerStories.push(story.headline);

    let newsStory = document.createElement('div');
    newsStory.textContent = story.headline;
    marquee.appendItem(newsStory);
  })
}

// const newsTicker = document.getElementById('news-ticker');
// const marquee = new dynamicMarquee.Marquee(newsTicker, { rate: -200 });
//
// dynamicMarquee.loop(marquee, [], function() {
//   var $separator = document.createElement('div');
//   $separator.innerHTML = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
//   return $separator;
// });

// const $item = document.createElement('div');
// $item.textContent = 'Appeals Court: Trump Can Withhold Funding from Sanctuary Cities';
// marquee.appendItem($item);
