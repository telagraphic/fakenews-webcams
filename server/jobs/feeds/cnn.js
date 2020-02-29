const puppeteer = require('puppeteer');
const fs = require('fs');
const newsService = require('../../services/newsService');
const news = require('../../config/sources');

async function fetchStories() {

  const url = "https://www.cnn.com/";

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  // const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1280, height: 4000 })
  await page.goto(url);

  await page.waitFor('div.pg-wrapper div.l-container');

  const stories = await page.evaluate(() => {
    let url = "https://www.cnn.com";

    const allStories = [];

    // banner

    if (document.querySelector('.zn-top h2.banner-text')) {

      let banner_headline = document.querySelector('.zn-top h2.banner-text').innerText;
      let banner_img = document.querySelector('.zn-top img').getAttribute('src');
      let banner_href= document.querySelector('.zn-top a.link-banner').getAttribute('href');

      banner_img = banner_img.replace('//', '');
      banner_href = url.concat(banner_href);

      if (article.headline.length > 0) {
        allStories.push(article);
      }

      if (banner_headline.length > 0) {
        allStories.push({headline: banner_headline, img: banner_img, href: banner_href});
      }

    }

    if (document.querySelectorAll('#homepage1-zone-1 .zn__column--idx-0 ul li article')) {

      let lead_story = document.querySelectorAll('#homepage1-zone-1 .zn__column--idx-0 ul li article');

      lead_story = lead_story[0];

      let lead_headline = lead_story.querySelector('.link-banner h2').innerText.replace(/(\r\n|\n|\r)/gm," ");
      let lead_img = lead_story.querySelector('.cd__wrapper img').getAttribute('src');
      let lead_href = lead_story.querySelector('.link-banner').getAttribute('href');

      lead_img = lead_img.replace('//', '');
      lead_href = url.concat(lead_href);

      let sublead_headline = lead_story.querySelector('.cd__wrapper .cd__headline a').innerText.replace(/(\r\n|\n|\r)/gm," ");
      let sublead_href = lead_story.querySelector('.cd__wrapper .cd__headline a').getAttribute('href');

      sublead_href = url.concat(sublead_href);

      if (lead_headline.length > 0) {
        allStories.push({headline: lead_headline, img: lead_img, href: lead_href});
      }

      if (sublead_headline.length > 0) {
        allStories.push({headline: sublead_headline, img: '', href: sublead_href});
      }
    }


    if (document.querySelectorAll('#homepage1-zone-1 .zn__column--idx-0 ul li article, #homepage1-zone-1 .zn__column--idx-1 ul li article, #homepage1-zone-1 .zn__column--idx-2 ul li article')) {
      let homepageZoneOne = Array.from(document.querySelectorAll('#homepage1-zone-1 .zn__column--idx-0 ul li article, #homepage1-zone-1 .zn__column--idx-1 ul li article, #homepage1-zone-1 .zn__column--idx-2 ul li article'));

      homepageZoneOne.shift();

      homepageZoneOne.forEach(story => {
        let article = {};

        // checks for placed ad
        if (story.querySelector('.cd__headline-text')) {
          article.headline = story.querySelector('.cd__headline-text').innerText.replace(/(\n)/gm," ");
        } else {
          article.headline = "";
        }

        if (story.querySelector('img')) {
          article.img = story.querySelector('img').getAttribute('src');
          article.img = article.img.replace('//', '');
        } else {
          article.img = "";
        }

        if (story.querySelector('a')) {
          article.href = story.querySelector('a').getAttribute('href');
        } else {
          article.href = '';
        }

        if (!article.href.startsWith('http')) {
          article.href = url.concat(article.href);
        }

        if (article.headline.length > 0) {
          allStories.push(article);
        }

      });
    }

    if (document.querySelectorAll('#homepage2-zone-1 .zn__column--idx-0 ul li article, #homepage2-zone-1 .zn__column--idx-1 ul li article, #homepage2-zone-1 .zn__column--idx-2 ul li article')) {
      let homepageZoneTwo = document.querySelectorAll('#homepage2-zone-1 .zn__column--idx-0 ul li article, #homepage2-zone-1 .zn__column--idx-1 ul li article, #homepage2-zone-1 .zn__column--idx-2 ul li article');
      homepageZoneTwo.forEach(story => {
        let article = {};

        // checks for placed ad
        if (story.querySelector('.cd__headline-text')) {
          article.headline = story.querySelector('.cd__headline-text').innerText.replace(/(\n)/gm," ");
        } else {
          article.headline = "";
        }

        // article.headline = story.querySelector('.cd__headline-text').innerText.replace(/(\n)/gm," ");

        if (story.querySelector('img')) {
          article.img = story.querySelector('img').getAttribute('src');
          article.img = article.img.replace('//', '');
        } else {
          article.img = "";
        }

        if (story.querySelector('a')) {
          article.href = story.querySelector('a').getAttribute('href');
        } else {
          article.href = '';
        }

        if (!article.href.startsWith('http')) {
          article.href = url.concat(article.href);
        }

        if (article.headline.length > 0) {
          allStories.push(article);
        }

      });
    }

    return allStories;

  });

  // console.log(stories);
  // fs.writeFileSync('../json/cnn.json', JSON.stringify(stories));

  newsService.createFakeNews(stories, news.cnn.name)
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
