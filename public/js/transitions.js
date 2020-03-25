barba.use(barbaCss);
barba.init({
  transitions: [
    {
      name: "fade",
      once() {},
      beforeEnter({current, next, trigger}) {

        // const links = document.querySelectorAll('header a');
        // const href = next.url.path;
        //
        // links.forEach(link => {
        //   if (link.getAttribute("href") === href) {
        //     link.classList.add("selected");
        //   } else {
        //     link.classList.remove("selected");
        //   }
        // });

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    }
  ]
});
