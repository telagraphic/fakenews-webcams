const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchStories() {

  const url = "https://www.infowars.com";

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('#content');

  const stories = await page.evaluate(() => {
    let url = "https://www.infowars.com";

    const allStories = [];

    // banner

    if (document.querySelector('.slider .slides li')) {
      let slider_stories = document.querySelectorAll('.slider .slides li');

      slider_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.flex-caption h3 a').innerText;
        article.href = story.querySelector('.flex-caption h3 a').getAttribute('href');
        article.img = story.querySelector('img').getAttribute('src');

        allStories.push(article);

      })
    }

    if (document.querySelector('#home-tabs')) {
      let featuredStories = document.querySelectorAll('#home-tabs #tabs-1 .article article');

      featuredStories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.article-content h3').innerText;
        if (story.querySelector('.article-content h3 a')) {
          article.href = story.querySelector('.article-content h3 a').getAttribute('href');
        }

        if (story.querySelector('.thumbnail img')) {
          article.img = story.querySelector('.thumbnail img').getAttribute('src');
        }

        allStories.push(article);
      });
    }


    if (document.querySelector('#home-tabs')) {
      let allNews = document.querySelectorAll('#home-tabs #tabs-2 .article article');

      allNews.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.article-content h3').innerText;
        if (story.querySelector('.article-content h3 a')) {
          article.href = story.querySelector('.article-content h3 a').getAttribute('href');
        }

        if (story.querySelector('.thumbnail img')) {
          article.img = story.querySelector('.thumbnail img').getAttribute('src');
        }

        allStories.push(article);
      });
    }


    return allStories;

  });

  console.log(stories);

  const data = JSON.stringify(stories);
  fs.writeFileSync('./json/infowars.json', data);


  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
