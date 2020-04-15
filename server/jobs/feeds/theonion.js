const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.theonion.com/";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('main.sc-11qwj9y-0');

  const stories = await page.evaluate(() => {
    let url = "https://www.theonion.com/";

    const allStories = [];

    if (document.querySelector('main.sc-11qwj9y-0')) {

      let main_stories = document.querySelectorAll('main.sc-11qwj9y-0 .js_curation-block-list section:nth-child(2) article');
      main_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h4').innerText;

        if (story.querySelector('img')) {
          article.img = story.querySelector('img').getAttribute('srcset');
        }

        article.href = story.querySelector('a').getAttribute('href');
        allStories.push(article);
      });

      let suport_stories = document.querySelectorAll('main.sc-11qwj9y-0 .js_curation-block-list section:nth-child(4) article');
      main_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h4').innerText;

        if (story.querySelector('img')) {
          article.img = story.querySelector('img').getAttribute('srcset');
        }

        article.href = story.querySelector('a').getAttribute('href');
        allStories.push(article);
      });

      let banner_stories = document.querySelectorAll('main.sc-11qwj9y-0 .js_curation-block-list section:nth-child(1) article');

      banner_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h4').innerText;
        article.href = story.querySelector('a').getAttribute('href');
        allStories.push(article);
      });
    }

    return allStories;

  });

  // console.log(stories);

  stories.forEach(story => {

    if (story.img) {
      let imgStringArray = story.img.split(" ");
      story.img = imgStringArray[6];
    } else {
      story.img = '';
    }

    if (!story.href) {
      story.href = '';
    }

  });

  await newsService.createFakeNews(stories, newsSource.theonion.name)
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
