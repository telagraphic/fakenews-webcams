const database = require('../database/connection');
const fs = require('fs');

async function createFakeNews(news, source) {

  if (news.length > 0) {

    news.forEach(story => {
      story.source = source;
    });

    database.none("DELETE FROM stories WHERE source = $1", source);

    return database.task(function(t) {
      var queries = [];
      news.forEach(function(story) {
        queries.push(t.none("INSERT INTO stories (headline, img, href, source) VALUES (${headline}, ${img}, ${href}, ${source})", story));
      });
      return t.batch(queries);
    })
    .then(function(data) {
      console.log("SAVED: " + data.length + " " + source + " stories.");
    })
    .catch(function(error) {
      console.log("FAILED: ", error);
    });

  } else {
    console.log(`No ${source} News to Report...`);
  }

}


async function getFakeNews() {
  let query = 'select json_build_object(source, json_agg(stories.*)) from stories group by source order by source';
  return database
          .any(query)
          .then(data => {
            return data;
          })
          .catch(function(err) {
            console.log(err);
            return next(err);
          });
}


module.exports = {
  createFakeNews: createFakeNews,
  getFakeNews: getFakeNews
}