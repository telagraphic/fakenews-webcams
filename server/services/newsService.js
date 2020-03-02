const newsModel = require('../models/newsModel');
const fs = require('fs');

async function createFakeNews(stories, source) {
  return newsModel.createFakeNews(stories, source);
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

      fs.writeFileSync('server/models/newsForClient.json', JSON.stringify(news));

      const allNews = [...news.CNN, ...news.FOX, ...news.RT, ...news.BLOOMBERG, ...news.BREITBART, ...news.INFOWARS, ...news.NYTIMES, ...news.POLITICO, ...news.ZEROHEDGE];

      return {
        ALL: allNews,
        CNN: news.CNN,
        FOX: news.FOX,
        RT: news.RT,
        BLOOMBERG: news.BLOOMBERG,
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
