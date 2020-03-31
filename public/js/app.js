const news = async () => {
  let response = await fetch('http://localhost:3000/api/fakenews');
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

const navLink = document.querySelector(".navigation__link");
const pageBody = document.querySelector("body");

barba.init({
  transitions: [
    {
      name: "switch",
      leave() {},
      enter() {}
    }
  ],
  views: [
    {
      namespace: "reader",
      beforeEnter() {
        navLink.setAttribute('href', '/tv');
      },
      beforeLeave() {
        const readerPage = document.querySelector('.reader');
        return new Promise (resolve => {
        const timeline = gsap.timeline({
          onComplete() {
            current.container.remove();
            resolve();
          }
        });

        timeline
          .set('.reader', {opacity: '1'}, 0)
          .set(next.container, {opacity: 0})
          .to('.reader', {opacity: '0', duration: .5}, 0)
          .to(next.container, {opacity: 1, duration: 1});
      })

      }
    },
    {
      namespace: "tv",
      beforeEnter() {
        navLink.setAttribute('href', '/');
      }
    }
  ]
});
