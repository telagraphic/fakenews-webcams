const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.theonion.com/";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('main.sc-11qwj9y-0');

  const stories = await page.evaluate(() => {
    let url = "https://www.theonion.com/";

    const allStories = [];

    if (document.querySelector('main.sc-11qwj9y-0')) {

      let main_stories = document.querySelectorAll('main.sc-11qwj9y-0 article');

      main_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('a').innerText;
        article.href = story.querySelector('a').getAttribute('href');

        // if (story.querySelector('h2')) {
        //   article.headline = story.querySelector('h2').innerText;
        //
        //   if (story.querySelector('a')) {
        //     article.href = story.querySelector('a').getAttribute('href');
        //     article.href = url.concat(article.href);
        //   }
        //
        //   if (story.querySelector('img')) {
        //     article.img = story.querySelector('img').getAttribute('src');
        //   }
        // }

        allStories.push(article);
      });
    }

    return allStories;

  });

  console.log(stories);

  const data = JSON.stringify(stories);
  fs.writeFileSync('../json/theonion.json', data);


  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
