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
          allNews.push(...news[prop].slice(11, 30))
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
      let theonion_headline = news.THEONION.shift();
      let huffpost_headline = news.HUFFPOST.shift();
      let talkingpointsmemo_headline = news.TALKINGPOINTSMEMO.shift();
      let drudgereport_headline = news.DRUDGEREPORT.shift();

      let storyLimit = 10;

      return {
        ALL: allNews,
        CNN_HEADLINE: cnn_headline,
        CNN_STORIES: news.CNN.slice(0, storyLimit),
        FOX_HEADLINE: fox_headline,
        FOX_STORIES: news.FOX.slice(0, storyLimit),
        RT_HEADLINE: rt_headline,
        RT_STORIES: news.RT.slice(0, storyLimit),
        NYTIMES_HEADLINE: nytimes_headline,
        NYTIMES_STORIES: news.NYTIMES.slice(0, storyLimit),
        BREITBART_HEADLINE: breitbart_headline,
        BREITBART_STORIES: news.BREITBART.slice(0, storyLimit),
        INFOWARS_HEADLINE: infowars_headline,
        INFOWARS_STORIES: news.INFOWARS.slice(0, storyLimit),
        POLITICO_HEADLINE: politico_headline,
        POLITICO_STORIES: news.POLITICO.slice(0, storyLimit),
        ZEROHEDGE_HEADLINE: zerohedge_headline,
        ZEROHEDGE_STORIES: news.ZEROHEDGE.slice(0, storyLimit),
        THEONION_HEADLINE: theonion_headline,
        THEONION_STORIES: news.THEONION.slice(0, storyLimit),
        HUFFPOST_HEADLINE: huffpost_headline,
        HUFFPOST_STORIES: news.HUFFPOST.slice(0, storyLimit),
        TALKINGPOINTSMEMO_HEADLINE: talkingpointsmemo_headline,
        TALKINGPOINTSMEMO_STORIES: news.TALKINGPOINTSMEMO.slice(0, storyLimit),
        DRUDGEREPORT_HEADLINE: drudgereport_headline,
        DRUDGEREPORT_STORIES: news.DRUDGEREPORT.slice(0, storyLimit)
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
