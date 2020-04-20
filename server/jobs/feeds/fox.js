const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const newsSource = require('../../config/sources');
const feedUtilities = require('../feed-utilities.js');

async function fetchStories() {

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  // const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(newsSource.fox.url);

  await page.waitFor('div.page-content');

  const stories = await page.evaluate(() => {

    const allStories = [];

    let banner_headline = document.querySelector('.main-content .sticky-region .story-1 .info-header h2 a').innerText;
    let banner_img = document.querySelector('.main-content .sticky-region .story-1 img').getAttribute('src');
    banner_img = banner_img.replace("//", "");
    let url = 'https://';
    banner_img = url.concat(banner_img);
    let banner_href= document.querySelector('.main-content .sticky-region .story-1 .info-header h2 a').getAttribute('href');

    if (banner_headline.length > 0) {
      allStories.push({headline: banner_headline, img: banner_img, href: banner_href});
    }

    let mainRelated = document.querySelectorAll('.main-content .sticky-region .story-1 .content .related ul li.related-item');
    mainRelated.forEach(story => {
      let article = {};

      article.headline = story.querySelector('a').innerText.replace(/(\r\n|\n|\r)/gm,"");
      article.href = story.querySelector('a').getAttribute('href');
      article.img = '';


      if (article.headline.length > 0) {
        allStories.push(article);
      }
    });


    mainCollection = document.querySelectorAll('.main-content .sticky-region .main .collection-spotlight .content article');
    mainCollection.forEach(story => {
      let article = {};

      article.headline = story.querySelector('.info .info-header a').innerText.replace(/(\r\n|\n|\r)/gm,"");
      article.href = story.querySelector('.info .info-header a').getAttribute('href');
      article.img = '';

      if (article.headline.length > 0) {
        allStories.push(article);
      }

    });


    secondaryCollection = document.querySelectorAll('.main-content .sticky-region .main .main-secondary .collection-article-list .article-list article');
    secondaryCollection.forEach(story => {
      let article = {};

      article.headline = story.querySelector('.info .info-header h2 a').innerText.replace(/(\r\n|\n|\r)/gm,"");
      article.href = story.querySelector('.info .info-header h2 a').getAttribute('href');
      article.img = '';

      if (article.headline.length > 0) {
        allStories.push(article);
      }

    });


    exclusiveClips = document.querySelectorAll('.main-content .sidebar-primary .sidebar-panel .collection .article-list article');
    exclusiveClips.forEach(story => {
      let article = {};

      article.headline = story.querySelector('.info .info-header a').innerText.replace(/(\r\n|\n|\r)/gm,"");
      article.href = story.querySelector('.info .info-header a').getAttribute('href');
      article.img = '';

      if (article.headline.length > 0) {
        allStories.push(article);
      }

    });

    return allStories;

  });

  stories.forEach(story => {

    if (story.img.length === 0) {
      story.img = newsSource.fox.placeholder;
    }

  });

  await newsService.createFakeNews(stories, newsSource.fox.name)
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
