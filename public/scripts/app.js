// using IIFE
(function($) {

  $(() => {

    $('.appetizer').on('click', () => {
      categoryMenu('appetizer');
    });
    $('.main').on('click', () => {
      categoryMenu('main');
    });
    $('.drink').on('click', () => {
      categoryMenu('drink');
    });
    $('.dessert').on('click', () => {
      categoryMenu('dessert');
    });


  });

  const categoryMenu = (category) => {

    $.getJSON('order/data', (data) => {
      // console.log(data[category]);
      showMenu(data[category]);
    })

  }

  // const showMenu = (data) => {
  //   const $test = $('#test');
  //   $test.empty();
  //   // $test.append(`<h1>${data[0].description}</h1>`);
  //   const appendContent = renderMenu(data);
  //   $test.append(appendContent);
  // }

  // const renderMenu = (data) => {
  //   console.log(data);
  //   let appendContent = '';
  //   for (let i = 0; i < data.length; i++) {
  //     appendContent +=
  //       `
  //         <div class="items">
  //           <img id="dish_pic" src="${data[i].thumbnail_url}">
  //           <div class="info">
  //             <text id="dish_name">${data[i].item_name}</text>
  //             <text id="dish_description">${data[i].description}</text>
  //             <text id="dish_price">${data[i].price}</text>
  //         </div>`;
  //   }
  //   return appendContent;
  // }

  // const showMenu = (data) => {
  //   const $menuContainer = $('.menuScrollCardContainer');
  //   $menuContainer.empty();
  //   // $test.append(`<h1>${data[0].description}</h1>`);
  //   const appendContent = renderMenu(data);
  //   $menuContainer.append(appendContent);
  // }

   const showMenu = (data) => {
    const $container = $('.menu_category_container');
    $container.empty();
    const $menuContainer = $('.menuScrollCardContainer');
    $menuContainer.empty();
    // $test.append(`<h1>${data[0].description}</h1>`);
    const appendContent = renderMenu(data);
    $container.append(appendContent);
  }

  const renderMenu = (data) => {
    // console.log(data);
    let appendContent = '';
    for (let i = 0; i < data.length; i++) {
      appendContent +=
        `
        <div class="menuScrollCard card p-5">
        <div class="photoAndTitle d-flex flex-row">
          <div class="image card w-50">
            <img id="dish_pic" src="${data[i].thumbnail_url}">
          </div>
          <div class="itemTitleAndPrice d-flex flex-column w-50 mt-5 mb-5">
            <p class="itemTitle text-end">${data[i].item_name}</p>
            <p class="itemPrice text-end">$${data[i].price.toFixed(2)}</p>
            <p class="itemDescr text-end">${data[i].description}</p>
            <div class="addToCartButton d-flex justify-content-end">
              <i class="bi bi-cart-plus h3 m-3"></i>
            </div>
          </div>
        </div>
        </div>`;
    }
    console.log(appendContent)
    return appendContent;
  }

   // const loadMenu = (category) => {
  //   console.log(category);
  //   // $.getJSON('/order/data')
  //   //   .then((data) => {
  //   //     console.log(category);
  //   //     console.log(data);
  //   //     const $test = $('#test');
  //   //     $test.append(`<h1>${data.cartTotal.sub_total}</h1>`);
  //   //   })
  // };

}) (jQuery);
