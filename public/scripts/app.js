// using IIFE
(function($) {

  $(() => {

    const loadCart = function() {
      // $(".all-tweets").empty();
      $.getJSON('/order/cart/6')
        .then((data) => {
          console.log(data)
          showCart(data);
        })
    }
    //first data load
    loadCart();

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

    // $('.deleteBtn').on('click', () => {
    //   // prevent the submit button from submitting
    //   console.log('hi');
    //   // event.preventDefault();
    //   // const data = $(this).attr('data-custom-id');

    //   // console.log('data is here', data)

    //   //  $.post("/order/delete_cart", {data})
    //   //   .then(() => { loadCart(); } )
    //   //
    //   //
    //   //   $.ajax({
    //   //     type: "POST",
    //   //     url: `/delete_cart`,
    //   //     data: data,
    //   //   })
    //   //     .then((response) => {
    //   //       loadCart()
    //   //     })
    //   //     .catch((error) => {
    //   //     });
    // });


  });


  /* load cart */
  const showCart = (data) => {
    const $test = $('#cartRows');
    const $cartRowsSum = $('#cartRowsSum');
    $test.empty();
    $cartRowsSum.empty();
    //$test.append(`<h1>${data[0].description}</h1>`);
    const appendContent = renderCart(data);
    const appendSum = renderCartSum(data);
    $test.append(appendContent).off('click').on('click', '.deleteBtn', (event) => {
      event.preventDefault();
      console.log($('.deleteBtn'))
      const data = $('.deleteBtn').attr('data-custom-id');
      console.log('data is here', data);
      $.post("/order/delete_cart", { data })
        .then((data) => {
          console.log(data);
          showCart(data);
        })
        .catch((error) => {
          console.log('error = ', error);
        });
    });
    $cartRowsSum.append(appendSum);
  }

  const renderCart = (data) => {
    let appendContent = '';
    for (let i = 0; i < data.cart.length; i++) {
      appendContent +=
        `
        <tr>
        <td><button class="deleteBtn" data-custom-id=${data.cart[i].custom_id}>X</button></td>
        <td>${data.cart[i]['item']}</td>
        <td>${data.cart[i]['price'].toFixed(2)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="ps-3 pt-0 pb-0">+${data.cart[i]['hot'] ? 'Hot' : 'Cold'}</td>
        <td></td>
      </tr>
      <tr>
      <td></td>
      <td class="ps-3 pt-0 pb-0">+${data.cart[i]['item_size']}</td>
      <td></td>
    </tr>
    <tr>
    <td></td>
    <td class="ps-3 pt-0 pb-0">+${data.cart[i]['spiciness']}</td>
    <td></td>
  </tr>
        `;
    }
    return appendContent;
  }

  const renderCartSum = (data) => {
    let appendContent = '';
    appendContent += `

    <tr>
    <td></td>
    <td class="text-end">Sub-Total</td>
    <td>$${Number(data.cartTotal.sub_total).toFixed(2)}</td>
  </tr>
  <tr>
    <td></td>
    <td class="text-end">Tax@5%</td>
    <td>$${Number(data.cartTotal.sub_total) * 0.05.toFixed(2)}</td>
  </tr>
  <tr>
    <td></td>
    <td class="text-end">Total</td>
    <td>$${(Number(data.cartTotal.sub_total) * 0.05 + Number(data.cartTotal.sub_total)).toFixed(2)}</td>
  </tr>
    `
    return appendContent;
  }






  /* Load cart end */

  /* Load menu */

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
    console.log(data)
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



       </div>


        <div class="accordion" id="accordionExample">
        <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Customizations
                </button>
                </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                  <table class="table">
                  <tbody>
                  <tr>
                    <td></td>
                    <td>Cold/Hot</td>
                    <td>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="${data[i].item_name}-coldHot" id="${data[i].item_name}1" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="${data[i].item_name}1">Hot</label>

                    <input type="radio" class="btn-check" name="${data[i].item_name}-coldHot" id="${data[i].item_name}2" autocomplete="off">
                    <label class="btn btn-outline-primary" for="${data[i].item_name}2">Cold</label>
                    </div>
                    </td>
                  </tr>
                  <tr>
                <td></td>
                <td class="">Size</td>
                <td class="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" class="btn-check" name="${data[i].item_name}-size" id="${data[i].item_name}3" autocomplete="off" checked>
                  <label class="btn btn-outline-primary" for="${data[i].item_name}3">S</label>

                  <input type="radio" class="btn-check" name="${data[i].item_name}-size" id="${data[i].item_name}4" autocomplete="off">
                  <label class="btn btn-outline-primary" for="${data[i].item_name}4">M</label>

                  <input type="radio" class="btn-check" name="${data[i].item_name}-size" id="${data[i].item_name}5" autocomplete="off">
                  <label class="btn btn-outline-primary" for="${data[i].item_name}5">L</label>
                </td>
              </tr>
              <tr>
                <td></td>
                <!-- Bootstrap Buttons won't show selected values, need to use javascript to do that later. -->
                <td>Spicyness</td>
                <td class="btn-group-a" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="${data[i].item_name}-spicyness" id="${data[i].item_name}6" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="${data[i].item_name}6">🌶️</label>

                <input type="radio" class="btn-check" name="${data[i].item_name}-spicyness" id="${data[i].item_name}7" autocomplete="off">
                <label class="btn btn-outline-primary" for="${data[i].item_name}7">🌶️🌶️</label>

                <input type="radio" class="btn-check" name="${data[i].item_name}-spicyness" id="${data[i].item_name}8" autocomplete="off">
                <label class="btn btn-outline-primary" for="${data[i].item_name}8">🌶️🌶️🌶️</label>

                <input type="radio" class="btn-check" name="${data[i].item_name}-spicyness" id="${data[i].item_name}9" autocomplete="off">
                <label class="btn btn-outline-primary" for="${data[i].item_name}9">🌶️🌶️🌶️🌶️</label>

                <input type="radio" class="btn-check" name="${data[i].item_name}-spicyness" id="${data[i].item_name}10" autocomplete="off">
                <label class="btn btn-outline-primary" for="${data[i].item_name}10">🌶️🌶️🌶️🌶️🌶️</label>
               </td>
               </tr>
               </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="confirm_button d-flex justify-content-end">
      <button class="bi bi-cart-plus h3 m-3 confirm_button__" data="${data[i].menu_id}"></button>
      </div>




      </div>






      
      </div>


      `;
    }
    //console.log(appendContent)
    return appendContent;
  }

  const categoryMenu = (category) => {

    $.getJSON('order/data', (data) => {
      // console.log(data[category]);
      showMenu(data[category]);
    })

  }

  // default load main menu
  categoryMenu('main');

  /* load menu end */

})(jQuery);



