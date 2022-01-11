// using IIFE
(function($) {

  $(() => {

    loadMenu('main');

  })

  const loadMenu = (category) => {
    $.getJSON('/order/data')
      .then((data) => {
        console.log(data);
        const $test = $('#test');
        $test.append(`<h1>${data.cartTotal.sub_total}</h1>`);
      })
  }

}) (jQuery);
