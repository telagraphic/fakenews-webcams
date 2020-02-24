const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchStories() {

  const url = "https://www.politico.com";

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('.page-wrapper');

  const stories = await page.evaluate(() => {
    let url = "https://www.politico.com";

    const allStories = [];

    let topnews_headline = document.querySelector('#main .page-content .page-content__row .container__column .container__row .container__column .media-item');
    let article = {};

    article.headline = topnews_headline.querySelector('h3.headline').innerText;
    article.img = topnews_headline.querySelector('img').getAttribute('src');
    article.href = topnews_headline.querySelector('a').getAttribute('href');

    allStories.push(article);

    // headlines.forEach(story => {
    //   let article = {};
    //
    //   article.headline = story.innerText;
    //   article.href = story.getAttribute('href');
    //
    //   allStories.push(article);
    // });

    let quick_pops = document.querySelectorAll('#main .page-content__row .container__column .container__slot .js-quick-pops .media-item-list li a');
    quick_pops.forEach(story => {
      let article = {};

      article.headline = story.innerText;
      article.href = story.getAttribute('href');

      allStories.push(article);
    });

    let top_news = document.querySelectorAll('#main .page-content__row .container__column .container__slot .media-item h3 a, #main .page-content__row .container__column .container__slot .media-item h1 a');
    top_news.forEach(story => {
      let article = {};

      article.headline = story.innerText;
      article.href = story.getAttribute('href');

      allStories.push(article);
    });

    return allStories;

  });

  console.log(stories);

  const data = JSON.stringify(stories);
  fs.writeFileSync('./json/politico.json', data);


  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
