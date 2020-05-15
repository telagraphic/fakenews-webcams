const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  console.log("JOB START: HUFFPOST");

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(newsSource.huffpost.url);

  await page.waitFor('.front-page-top');

  const stories = await page.evaluate(() => {

    const allStories = [];

    if (document.querySelector('.front-page-top #zone-main')) {

      let headline_story = document.querySelector('#zone-main .splash');

      let article = {};

      article.headline = headline_story.querySelector('.splash__text a').innerText;
      article.href = headline_story.querySelector('.splash__text a').getAttribute('href');;
      article.img = headline_story.querySelector('.splash__image picture:last-child img').getAttribute('src');

      allStories.push({headline: article.headline, href: article.href, img: article.img});
    }

    if (document.querySelector('.front-page-top #zone-atf')) {

      let headline_support_stories = document.querySelectorAll('.front-page-top #zone-atf .card');

      headline_support_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h3').innerText;
        article.href = story.querySelector('a').getAttribute('href');


        allStories.push(article);
      });

    }

    if (document.querySelector('.front-page-content .zone__content')) {

      let headline_support_stories = document.querySelectorAll('.front-page-content .zone__content .card');

      headline_support_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h3').innerText;
        article.href = story.querySelector('a').getAttribute('href');

        allStories.push(article);
      });

    }

    return allStories;

  });

  stories.forEach(story=> {
    story.headline = feedUtilities.properCase(story.headline);
    if (!story.img) {
      story.img = newsSource.huffpost.placeholder;
    }
  })

  await newsService.createFakeNews(stories, newsSource.huffpost.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });

  await browser.close();

}

console.log("JOB START-END: HUFFPOST");

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
