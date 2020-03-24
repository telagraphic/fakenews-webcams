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

      // fs.writeFileSync('server/models/newsFromDatabase.json', JSON.stringify(data));

      let news = {};
      for (var i = 0; i < data.length; i++) {
        let obj = data[i].json_build_object;
        let name = Object.keys(obj)[0];
        news[name] = obj[name];
      };

      // fs.writeFileSync('server/models/newsForClient.json', JSON.stringify(news));

      const allNews = [];

      for (const prop in news) {
        if (news[prop]) {
          allNews.push(...news[prop])
        }
      }

      return {
        ALL: allNews,
        CNN: news.CNN,
        FOX: news.FOX,
        RT: news.RT,
        // BLOOMBERG: news.BLOOMBERG,
        BREITBART: news.BREITBART,
        INFOWARS: news.INFOWARS,
        NYTIMES: news.NYTIMES,
        POLITICO: news.POLITICO,
        ZEROHEDGE: news.ZEROHEDGE
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
