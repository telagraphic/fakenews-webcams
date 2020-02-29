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


async function getFakeNews() {
  let query = 'select json_build_object(source, json_agg(stories.*)) from stories group by source order by source';
  return db.any(query)
            .then(function(stories) {
              var formatted = {};
              for (var i = 0; i < stories.length; i++) {
                var obj = stories[i].json_build_object;
                var name = Object.keys(obj)[0];
                formatted[name] = obj[name];
              };

      return formatted;
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
