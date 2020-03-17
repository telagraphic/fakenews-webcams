const Marquee = dynamicMarquee.Marquee;

const marquee = new Marquee(document.getElementById('marquee'), {
  rate: -200,
});

// dynamicMarquee.loop(marquee, [() => 'item 1', () => 'item 2']);

const $item = document.createElement('a');
$item.textContent = 'testing123';
marquee.appendItem($item);


dynamicMarquee.loop(marquee, [
        function() { return ''; },
        function() { return 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old'; },
        function() { return 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source'; },
        function() { return 'RLorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC'; }
      ], function() {
        var $separator = document.createElement('div');
        $separator.innerHTML = '&nbsp|&nbsp';
        return $separator;
      });




// import Marquee from './marquee.js';

// init with class
// const marquee = new Marquee('.marquee')



// startTicker('news-ticker', {speed:1, delay:0});
//
// const news = async () => {
//   let response = await fetch('http://localhost:3000/api/fakenews');
//   let data = await response.json();
//   return data;
// }
//
//
//
// news()
//   .then(data => {
//     renderNewsPage(data.news);
//   })
//   .catch(error => {
//     new Error(error);
//   });
//
//
// function renderNewsPage(news) {
//
//   for (const prop in news) {
//     if (prop !== 'ALL') {
//       console.log(news[prop]);
//     }
//   }
//
// }
//
//
// function renderNewsTicker() {
//
// }
