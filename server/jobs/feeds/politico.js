const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  console.log("JOB START: POLITICO");

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(newsSource.politico.url);

  await page.waitFor('.page-wrapper');

  const stories = await page.evaluate(() => {

    const allStories = [];

    if (document.querySelector('#main .page-content .page-content__row .container__column .container__row .container__column .media-item')) {
      let topnews_headline = document.querySelector('#main .page-content .page-content__row .container__column .container__row .container__column .media-item');
      let article = {};

      article.headline = topnews_headline.querySelector('h3.headline').innerText;
      article.img = topnews_headline.querySelector('img').getAttribute('src');
      article.href = topnews_headline.querySelector('a').getAttribute('href');

      if (article.img.length < 0) {
        article.img = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/POLITICO_Logo.jpg';
      }

      allStories.push(article);
    }


    if (document.querySelector('#main .page-content__row .container__column .container__slot .media-item h3 a')) {
      let top_news = document.querySelectorAll('#main .page-content__row .container__column .container__slot .media-item h3 a, #main .page-content__row .container__column .container__slot .media-item h1 a');
      top_news.forEach(story => {
        let article = {};

        article.headline = story.innerText.trim();
        article.href = story.getAttribute('href');
        article.img = '';

        allStories.push(article);
      });
    }

    if ('#main .page-content__row .container__column .container__slot .js-quick-pops .media-item-list li a') {
      let quick_pops = document.querySelectorAll('#main .page-content__row .container__column .container__slot .js-quick-pops .media-item-list li a');
      quick_pops.forEach(story => {
        let article = {};

        article.headline = story.innerText.trim();
        article.href = story.getAttribute('href');
        article.img = '';

        allStories.push(article);
      });
    }



    return allStories;

  });

  stories.forEach(story => {
    story.headline = feedUtilities.properCase(story.headline);
    if (story.img.length < 0 || !story.img) {
      story.img = newsSource.politico.placeholder;
    }
  });

  await newsService.createFakeNews(stories, newsSource.politico.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });


  await browser.close();

}

console.log("JOB START-END: POLITICO");

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
