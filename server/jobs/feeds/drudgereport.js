const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(newsSource.drudgereport.url);

  await page.waitFor('body');

  const stories = await page.evaluate(() => {

    const allStories = [];

    if (document.querySelector('tt')) {

      let headline_stories = document.querySelectorAll('body tt:first-of-type tt:first-of-type center a');
      let headline_image = document.querySelector('body tt:first-of-type tt:first-of-type center img');

      headline_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = headline_image.getAttribute('src');

        allStories.push(article);
      });

    }

    if (document.querySelector('tt')) {

      let headline_support_stories = document.querySelectorAll('body tt:first-of-type tt a');

      headline_support_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = story.getAttribute('src');

        allStories.push(article);
      });
    }

    if (document.querySelector('table')) {

      let body_stories = document.querySelectorAll('table tr:first-child a');

      body_stories.forEach(story => {
        let article = {};

        article.headline = story.innerText;
        article.href = story.getAttribute('href');
        article.img = story.getAttribute('src');

        allStories.push(article);
      });
    }



    return allStories;

  });

  stories.forEach(story=> {
    story.headline = feedUtilities.properCase(story.headline);
    console.log(story);
    if (!story.img) {
      story.img = newsSource.drudgereport.placeholder;
    }
  })

  // const data = JSON.stringify(stories);
  // fs.writeFileSync('../json/drudgereport.json', data);

  newsService.createFakeNews(stories, newsSource.drudgereport.name)
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
