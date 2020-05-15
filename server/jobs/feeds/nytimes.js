const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');

async function fetchStories() {

  console.log("JOB START: NYTIMES");

  const url = "https://www.nytimes.com";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('main#site-content');

  const stories = await page.evaluate(() => {
    let url = "https://www.nytimes.com";

    const allStories = [];

    if (document.querySelector('#e-spotlight-banner a')) {
      let banner = document.querySelector('#e-spotlight-banner a');
    }


    if (document.querySelector('section[data-testid="block-Spotlight"]')) {

      let main_stories = document.querySelectorAll('section[data-testid="block-Spotlight"] .assetWrapper');

      main_stories.forEach(story => {
        let article = {};

        if (story.querySelector('h2')) {
          article.headline = story.querySelector('h2').innerText;

          if (story.querySelector('a')) {
            article.href = story.querySelector('a').getAttribute('href');
            article.href = url.concat(article.href);
          }

          if (story.querySelector('img')) {
            article.img = story.querySelector('img').getAttribute('src');
          } else {
            article.img = 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg';
          }
        }

        allStories.push(article);
      });

    }

    if (document.querySelector('#site-content')) {

      let support_stories = document.querySelectorAll('#site-content .css-698um9 .assetWrapper, #site-content .css-19tmjl7 .assetWrapper');

      support_stories.forEach(story => {
        let article = {};

        if (story.querySelector('h2')) {
          article.headline = story.querySelector('h2').innerText;

          if (story.querySelector('a')) {
            article.href = story.querySelector('a').getAttribute('href');
            article.href = url.concat(article.href);
          }

          if (story.querySelector('img')) {
            article.img = story.querySelector('img').getAttribute('src');
          } else {
            article.img = 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg';
          }
        }

        allStories.push(article);
      });
    }

    return allStories;

  });

  await newsService.createFakeNews(stories, newsSource.nytimes.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });

  await browser.close();

}

console.log("JOB START-END: NYTIMES");

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
