const puppeteer = require('puppeteer');
const fs = require('fs');

async function fetchStories() {

  const url = "https://www.bloomberg.com";

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('main.hub-main');

  const stories = await page.evaluate(() => {
    let url = "https://www.bloomberg.com";

    const allStories = [];


    if (document.querySelector('main.hub-main .hub-zone-full')) {
      let main_story = document.querySelector('.hub-zone-full .single-story-module__story');

      let main_article = {};

      main_article.headline = main_story.querySelector('.single-story-module__info .single-story-module__headline-link').innerText;
      main_article.href = main_story.querySelector('.single-story-module__info .single-story-module__headline-link').getAttribute('href');
      main_article.href = url.concat(main_article.href);
      main_article.img = main_story.querySelector('.single-story-module__image img').getAttribute('src');

      allStories.push(main_article);

      let main_related_stories = document.querySelectorAll('.hub-zone-full .single-story-module__story .single-story-module__info .single-story-module__related-stories .single-story-module__related-story');

      main_related_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('a').innerText;
        article.href = story.querySelector('a').getAttribute('href');
        article.href = url.concat(article.href)

        allStories.push(article);
      });
    }

    if (document.querySelector('main.hub-main .hub-zone-righty')) {
      let main_story = document.querySelector('main.hub-main .hub-zone-righty .hub-zone-righty__content .single-story-module__story');

      let main_article = {};

      main_article.headline = main_story.querySelector('.single-story-module__info a').innerText;
      main_article.href = main_story.querySelector('.single-story-module__info a').getAttribute('href');
      main_article.href = url.concat(main_article.href);
      main_article.img = main_story.querySelector('.single-story-module__image').getAttribute('src');

      allStories.push(main_article);

      main_related_stories = document.querySelectorAll('main.hub-main .hub-zone-righty .hub-zone-righty__content #single_story2 .single-story-module__info .single-story-module__related-stories .single-story-module__related-story');

      main_related_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('a').innerText;
        article.href = story.querySelector('a').getAttribute('href');
        article.href = url.concat(article.href);

        allStories.push(article);
      });
    }

    if (document.querySelector('#story_package_2')) {
      let package_stories = document.querySelectorAll('.hub-zone-righty .hub-zone-righty__content #story_package_2 .story-package-module__stories .story-package-module__story');

      package_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('h3 a').innerText;
        article.href = story.querySelector('h3 a').getAttribute('href');
        article.href = url.concat(article.href);

        allStories.push(article);
      });
    }

    return allStories;

  });

  console.log(stories);

  const data = JSON.stringify(stories);
  fs.writeFileSync('./json/bloomberg.json', data);


  await browser.close();

}

fetchStories();

module.exports = {
  fetchStories : fetchStories
}
