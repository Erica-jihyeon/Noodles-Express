// Client facing scripts here
$(() => {

  const loadMenu = (category) => {
    $.getJSON('/order/data')
      .then((data) => {
        console.log(`app.js`, data);
      })
  }
  loadMenu('main');

})
