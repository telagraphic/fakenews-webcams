const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  console.log("JOB START: DRUDGEREPORT");

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(newsSource.drudgereport.url);

  await page.waitFor('body');

  const stories = await page.evaluate(() => {

    const allStories = {
        headline: [],
        headline_support: [],
        body_stories: []
      };

    if (document.querySelector('tt')) {

      let headline_stories = document.querySelectorAll('body tt:first-of-type tt:first-of-type center a');
      let headline_image = document.querySelector('body tt:first-of-type tt:first-of-type center img');

      headline_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = headline_image.getAttribute('src');

        allStories.headline.push(article);
      });

    }

    if (document.querySelector('tt')) {

      let headline_support_stories = document.querySelectorAll('body tt:first-of-type tt a');

      headline_support_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = story.getAttribute('src');

        allStories.headline_support.push(article);
      });
    }

    if (document.querySelector('table')) {

      let body_stories = document.querySelectorAll('table tr:first-child a');

      body_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = story.getAttribute('src');

        allStories.body_stories.push(article);
      });
    }



    return allStories;

  });

  const storiesToSave = [...stories.headline, ...stories.headline_support];

  storiesToSave.forEach(story=> {
    story.headline = feedUtilities.properCase(story.headline);
    if (!story.img) {
      story.img = newsSource.drudgereport.placeholder;
    }
  })

  await newsService.createFakeNews(storiesToSave, newsSource.drudgereport.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });

  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
