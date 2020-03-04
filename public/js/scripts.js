const news = async () => {
  let response = await fetch('http://localhost:3000/api/fakenews');
  let data = await response.json();
  return data;
}



news()
  .then(data => {
    renderNewsPage(data.news);
  })
  .catch(error => {
    new Error(error);
  });


function renderNewsPage(news) {

  for (const prop in news) {
    if (prop !== 'ALL') {
      console.log(news[prop]);
    }
  }

}


function renderNewsTicker() {

}
