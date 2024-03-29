const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  console.log("JOB START: RT");

  const url = "https://www.rt.com";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('div.layout__content');

  const stories = await page.evaluate(() => {
    let url = "https://www.rt.com";

    const allStories = [];

    let main_stories = document.querySelectorAll('.layout__content .columns .main-promobox__list li.main-promobox__item');

    main_stories.forEach(story => {
      let article = {};

      article.headline = story.querySelector('a').innerText;
      article.href = url.concat(story.querySelector('a').getAttribute('href'));
      article.img = story.querySelector('img').getAttribute('src');

      allStories.push(article);
    });


    let popular = document.querySelector('.layout__content .columns__column .columns__content .news-block .main-viralbox');

    let article = {};

    article.headline = popular.querySelector('a.link').innerText;
    article.href = url.concat(popular.querySelector('a.link').getAttribute('href'));

    if (popular.querySelector('img')) {
      article.img = popular.querySelector('img').getAttribute('src');
    } else {
      article.img = '';
    }


    allStories.push(article);


    let contentCards = document.querySelectorAll('.layout__content .columns--mainpage .content-card .article-widget__item .article-card');

    contentCards.forEach(story => {
      let article = {};

      article.headline = story.querySelector('.article-card__title a').innerText;
      article.href = url.concat(story.querySelector('.article-card__title a').getAttribute('href'));

      if (story.querySelector('img')) {
        article.img = story.querySelector('img').getAttribute('src');
      } else {
        article.img = "";
      }

      allStories.push(article);
    });


    return allStories;

  });

  stories.forEach(story => {
    story.headline = feedUtilities.properCase(story.headline);
  });

  await newsService.createFakeNews(stories, newsSource.rt.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });


  await browser.close();

}

console.log("JOB START-END: RT");

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
