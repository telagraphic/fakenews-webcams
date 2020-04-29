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

const bodyTag = document.querySelector('body');
const interstitial = document.createElement('section');
interstitial.classList.add('reader-to-tv-interstitial');
bodyTag.appendChild(interstitial);

barba.init({
  transitions: [
    {
      name: 'fade-once',
      once({current, next, trigger}) {
        console.log('fade-once: once');

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });

          timeline
            .to('.page__header', {y: '0%', duration: 1, ease: 'power4.out'}, 0)
            .to('.page__main', {opacity: 1, duration: 1, ease: 'circ'}, 0);

        });
      }
    },
    {
      name: 'fadetotv',
      from : {
        namespace: ['reader']
      },
      to: {
        namespace: ['tv']
      },
      beforeEnter({current, next, trigger}) {
        console.log('fadetotv: beforeEnter');

        window.scrollTo({top: 0, behavior: 'smooth'});

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });

          timeline
            .set(next.container, {opacity: 0})
            .to('.reader-to-tv-interstitial', {y: '0%'})
            .to('.reader-to-tv-interstitial', {zIndex: -10});

        });
      },
      enter({current, next, trigger}) {
        console.log('fadetotv: enter');

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });

          timeline
            .to(next.container, {opacity: 1})
            .to('.reader-to-tv-interstitial', {opacity: 0, duration: 1})
        });

      },
      leave({current, next, trigger}) {
        console.log('fadetotv: leave');
        const interstitial = document.querySelector('.reader-to-tv-interstitial');
        interstitial.style.zIndex = 10;

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
              current.container.remove();
            }
          });

          timeline
            .set('.reader-to-tv-interstitial', {y: '100%', opacity: 1})
            .to('.reader-to-tv-interstitial', {y: '0%', duration: 1, ease: 'circ'});

        });
      }
    },
    {
      name: 'fadetoreader',
      from : {
        namespace: ['tv']
      },
      to: {
        namespace: ['reader']
      },
      beforeEnter({current, next, trigger}) {
        console.log('fadetoreader: beforeEnter');

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
            }
          });

          timeline
            .to(next.container, {opacity: 1, duration: 2, ease: 'circ'});
        });

      },
      leave({current, next, trigger}) {
        console.log('fadetoreader: leave');

        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
              resolve();
              current.container.remove();
            }
          });

          timeline
            .set(current.container, {opacity: 1})
            .set(next.container, {opacity: 0, duration: 1})
            .to(current.container, {opacity: 0, duration: 1});
        });
      }
    }
  ],
  views: [
    {
      namespace: 'reader',
      beforeEnter() {
        const navLink = document.querySelector('.navigation__link');
        const navButton = document.querySelector('.navigation__button')
        navLink.setAttribute('href', '/tv');
        navButton.classList.remove('button-highlight');
      }
    },
    {
      namespace: 'tv',
      beforeEnter() {
        const navLink = document.querySelector('.navigation__link');
        const navButton = document.querySelector('.navigation__button')
        navLink.setAttribute('href', '/');
        navButton.classList.add('button-highlight');
      }
    }
  ],
  debug: true
});

barba.hooks.after(() => {
  fathom('set', 'spa', 'pushstate');
});
