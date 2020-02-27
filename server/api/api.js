const db = require('../config/db');

function createFakeNews(stories, source) {

  if (stories.length > 0) {

    stories.forEach(story => {
      story.source = source;
    });

    db.none("DELETE FROM stories WHERE source = $1", source);

    return db.task(function(t) {
      var queries = [];
      stories.forEach(function(story) {
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


module.exports = {
  createFakeNews: createFakeNews
}
