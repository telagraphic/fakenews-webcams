const newsModel = require('../models/newsModel');
const fs = require('fs');

async function createFakeNews(news, newsSource) {

  if (news.length > 0) {

    news.forEach(story => {
      story.source = newsSource;
    });

    return newsModel.createFakeNews(news, newsSource);

  } else {
    console.log(`No ${newsSource} News to Report...`);
  }
}


async function getFakeNews() {

  return newsModel
    .getFakeNews()
    .then(data => {

      let news = {};
      for (var i = 0; i < data.length; i++) {
        let obj = data[i].json_build_object;
        let name = Object.keys(obj)[0];
        news[name] = obj[name];
      };

      const allNews = [];

      for (const prop in news) {
        if (news[prop]) {
          allNews.push(...news[prop])
        }
      }

      let cnn_headline = news.CNN.shift();
      let fox_headline = news.FOX.shift();
      let rt_headline = news.RT.shift();
      let nytimes_headline = news.NYTIMES.shift();
      let breitbart_headline = news.BREITBART.shift();
      let infowars_headline = news.INFOWARS.shift();
      let politico_headline = news.POLITICO.shift();
      let zerohedge_headline = news.ZEROHEDGE.shift();
      let bloomberg_headline = news.ZEROHEDGE.shift();


      return {
        ALL: allNews,
        CNN_HEADLINE: cnn_headline,
        CNN_STORIES: news.CNN,
        FOX_HEADLINE: fox_headline,
        FOX_STORIES: news.FOX,
        RT_HEADLINE: rt_headline,
        RT_STORIES: news.RT,
        NYTIMES_HEADLINE: nytimes_headline,
        NYTIMES_STORIES: news.NYTIMES,
        BREITBART_HEADLINE: breitbart_headline,
        BREITBART_STORIES: news.BREITBART,
        INFOWARS_HEADLINE: infowars_headline,
        INFOWARS_STORIES: news.INFOWARS,
        POLITICO_HEADLINE: politico_headline,
        POLITICO_STORIES: news.POLITICO,
        ZEROHEDGE_HEADLINE: zerohedge_headline,
        ZEROHEDGE_STORIES: news.ZEROHEDGE,
        BLOOMBERG_HEADLINE: bloomberg_headline,
        BLOOMBERG_STORIES: news.BLOOMBERG
      }
    })
    .catch(error => {
      throw new Error(error);
    });

}


module.exports = {
  createFakeNews: createFakeNews,
  getFakeNews: getFakeNews
}
