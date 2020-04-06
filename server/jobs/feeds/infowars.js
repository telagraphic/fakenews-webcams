const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.infowars.com";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

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
        article.headline.toLowerCase();
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
        article.headline.toUpperCase();
        if (story.querySelector('.article-content h3 a')) {
          article.href = story.querySelector('.article-content h3 a').getAttribute('href');
        }

        if (story.querySelector('.thumbnail img')) {
          article.img = story.querySelector('.thumbnail img').getAttribute('src');
        } else {
          article.img = '';
        }

        allStories.push(article);
      });
    }


    if (document.querySelector('#home-tabs')) {
      let allNews = document.querySelectorAll('#home-tabs #tabs-2 .article article');

      allNews.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.article-content h3').innerText;
        article.headline.toUpperCase();
        if (story.querySelector('.article-content h3 a')) {
          article.href = story.querySelector('.article-content h3 a').getAttribute('href');
        }

        if (story.querySelector('.thumbnail img')) {
          article.img = story.querySelector('.thumbnail img').getAttribute('src');
        } else {
          article.img = '';
        }

        allStories.push(article);
      });
    }


    return allStories;

  });


  stories.forEach(story=> {
    story.headline = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(story.headline))
  })

  newsService.createFakeNews(stories, newsSource.infowars.name)
    .then((response) => {
      process.exit(0);
    }).
    catch((error) => {
      process.exit(0);
    });

  await browser.close();

}

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
  return string.replace(/\w\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
