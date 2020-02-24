const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchStories() {

  const url = "https://www.zerohedge.com";

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
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
        article.img = story.querySelector('.teaser-content .teaser-image img').getAttribute('src');

        allStories.push(article);

      });
    }

    return allStories;

  });

  console.log(stories);

  const data = JSON.stringify(stories);
  fs.writeFileSync('./json/zerohedge.json', data);


  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
