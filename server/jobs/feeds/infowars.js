const puppeteer = require('puppeteer');
const fs = require('fs');
const db = require('../../api/api');
const news = require('../../config/sources');

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

  // function titleCase(str) {
  //   return str.toLowerCase().split(' ').map(function(word) {
  //     return (
  //       if (word.charAt(0) === "\'") {
  //         word.charAt(1).toUpperCase() + word.slice(2)
  //       } else (
  //         word.charAt(0).toUpperCase() + word.slice(1)
  //       )
  //     );
  //   }).join(' ');
  // }

  // function titleCase(str) {
  //   str = str.toLowerCase().split(' ');
  //   for (var i = 0; i < str.length; i++) {
  //     if (str[i] === "\'") {
  //       str[i] = str[i].charAt(1).toUpperCase() + str[i].slice(2);
  //     } else {
  //       str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  //     }
  //   }
  //   return str.join(' ');
  // }
  //
  // const typesetStories = [];
  //
  // stories.forEach(story => {
  //
  //   let lowercaseHeadline = story.headline.toLowerCase();
  //   story.headline = titleCase(lowercaseHeadline);
  //   typesetStories.push(story);
  //
  // });
  // https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
  //
  // console.log(typesetStories);

  // console.log(stories);
  // const data = JSON.stringify(stories);
  // fs.writeFileSync('../json/infowars.json', data);

  db.createFakeNews(stories, news.infowars.name)
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
