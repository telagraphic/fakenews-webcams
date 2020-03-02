const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.zerohedge.com";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('.layout-content');

  const stories = await page.evaluate(() => {
    let url = "https://www.zerohedge.com";

    const allStories = [];

    if (document.querySelector('#block-zerohedge-content')) {
      let main_stories = document.querySelectorAll('#block-zerohedge-content .view-content .views-row');


      main_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h2 a .field').innerText;
        article.href = story.querySelector('h2 a').getAttribute('href');
        article.href = url.concat(article.href);

        if (story.querySelector('.teaser-content .teaser-image img')) {
          article.img = story.querySelector('.teaser-content .teaser-image img').getAttribute('src');
        } else {
          article.img = '';
        }

        allStories.push(article);

      });
    }

    return allStories;

  });

  // console.log(stories);
  // const data = JSON.stringify(stories);
  // fs.writeFileSync('../json/zerohedge.json', data);

  newsService.createFakeNews(stories, newsSource.zerohedge.name)
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
