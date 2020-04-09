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
  await page.goto(newsSource.talkingpointsmemo.url);

  await page.waitFor('#page');

  const stories = await page.evaluate(() => {

    const allStories = [];

    if (document.querySelector('.StorySlot')) {

      let headline_story = document.querySelector('.StorySlot');

      let article = {};

      article.headline = headline_story.querySelector('h4').innerText;
      article.href = headline_story.querySelector('a').getAttribute('href');;
      article.img = headline_story.querySelector('img').getAttribute('src');

      allStories.push({headline: article.headline, href: article.href, img: article.img});
    }

    if (document.querySelector('.FeatureStoryPane__Frame1 .StorySlot')) {

      let headline_support_stories = document.querySelectorAll('.FeatureStoryPane__Frame1 .StorySlot');

      headline_support_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.StorySlot__Headline h4').innerText;
        article.href = story.querySelector('.StorySlot__Headline a').getAttribute('href');

        allStories.push(article);
      });

    }

    if (document.querySelector('.FeatureStoryPane__FlexItem')) {

      let headline_aside_stories = document.querySelectorAll('.FeatureStoryPane__FlexItem .StorySlot');

      headline_aside_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('.StorySlot__Headline a').innerText;
        article.href = story.querySelector('.StorySlot__Headline a').getAttribute('href');

        allStories.push(article);
      });

    }

    if (document.querySelector('#wide_bar')) {

      let editors_stories = document.querySelectorAll('#wide_bar .EdblogBar__Children .StoryItem');

      editors_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('a.StoryItem__Headline div').innerText;
        article.href = story.querySelector('a.StoryItem__Headline').getAttribute('href');

        allStories.push(article);
      });

    }

    return allStories;

  });

  stories.forEach(story=> {
    // story.headline = feedUtilities.properCase(story.headline);
    if (!story.img) {
      story.img = newsSource.talkingpointsmemo.placeholder;
    }
    console.log(story);
  })

  newsService.createFakeNews(stories, newsSource.talkingpointsmemo.name)
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
