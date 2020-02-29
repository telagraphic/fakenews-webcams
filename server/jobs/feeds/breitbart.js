const puppeteer = require('puppeteer');
const fs = require('fs');
const db = require('../../api/api');
const news = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.breitbart.com";

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('#GlobalW #ContentW');

  const stories = await page.evaluate(() => {
    let url = "https://www.breitbart.com";

    const allStories = [];

    if (document.querySelector('#ContainerW #MainW .top_article_main')) {
      let main_story = document.querySelector('#MainW .top_article_main .has-thumb');

      let main_article = {};

      main_article.headline = main_story.querySelector('h2 a').innerText;
      main_article.href = main_story.querySelector('h2 a').getAttribute('href');
      main_article.href = url.concat(main_article.href);
      main_article.img = main_story.querySelector('img.wp-post-image').getAttribute('src');

      allStories.push(main_article);
    }

    if (document.querySelector('#ContentW #ContainerW #SideW')) {
      let popular_stories = document.querySelectorAll('#ContentW #ContainerW #SideW #DQSW ul li');

      popular_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('a em').innerText;
        article.href = story.querySelector('a').getAttribute('href');
        article.href = url.concat(article.href);

        if (story.querySelector('a img')) {
          article.img = story.querySelector('a img').getAttribute('src');
        } else {
          article.img = '';
        }

        allStories.push(article);

      });
    }

    if (document.querySelector('#ContentW #ContainerW #MainW #BBTrendNow')) {
      on_the_radar = document.querySelectorAll('#ContentW #ContainerW #MainW #BBTrendNow #BBTrendUL li');

      on_the_radar.forEach(story => {
        let article = {};

        let lowercaseHeadline = story.querySelector('a').innerText.toLowerCase();
        let capitalizedHeadline = lowercaseHeadline.charAt(0).toUpperCase() + lowercaseHeadline.slice(1);

        article.headline = capitalizedHeadline;
        article.href = story.querySelector('a').getAttribute('href');
        article.href = url.concat(article.href);

        article.img = '';

        allStories.push(article);

      });
    }

    if (document.querySelector('#ContentW #ContainerW #MainW #gmxcanvas')) {
      let wall_stories = document.querySelectorAll('#ContentW #ContainerW #MainW #gmxcanvas article');

      wall_stories.forEach(story => {
        let article = {};

        article.headline = story.querySelector('footer h2 a').innerText;

        if (story.querySelector('footer')) {
          article.href = story.querySelector('footer a').getAttribute('href');
          article.href = url.concat(article.href);
        }

        if (story.querySelector('.tco')) {
          article.img = story.querySelector('.tco img').getAttribute('src');
        } else {
          article.img = '';
        }

        allStories.push(article);

      })
    }


    return allStories;

  });

  // console.log(stories);
  // const data = JSON.stringify(stories);
  // fs.writeFileSync('../json/breitbart.json', data);

  db.createFakeNews(stories, news.breitbart.name)
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