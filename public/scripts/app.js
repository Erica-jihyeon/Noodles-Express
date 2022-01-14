  // const { send_sms } = require('./send_sms');

  // let ownerPhoneNum = '7786813760';
  // const message = 'New order! Please check your dashboard!';
  // //need to send a message
  // send_sms(message ,ownerPhoneNum);
// using IIFE
(function($) {
  $(() => {

    $("#allFilterBtn").click(function () {
      var rows = $("#table_body").find("tr").hide();
      console.log($("#table_body").find("tr td:eq(1)"))
      rows.filter(":contains('')").show();
   });

    $("#newFilterBtn").click(function () {
      var rows = $("#table_body").find("tr").hide();
      rows.filter(":contains('ordered')").show();
   });

    $("#acceptedFilterBtn").click(function () {
      var rows = $("#table_body").find("tr").hide();
      rows.filter(":contains('Preparing your meal')").show();
   });

    $("#completedFilterBtn").click(function () {
      var rows = $("#table_body").find("tr").hide();
      rows.filter(":contains('complete')").show();
   });

   $("#InCartBtn").click(function () {
    var rows = $("#table_body").find("tr").hide();
    rows.filter(":contains('In Cart')").show();
 });

    const loadCart = function() {
      $.getJSON('/order/cart/6')
        .then((data) => {
          console.log(data)
          showCart(data);
        })
    }
    //first existing cart load
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

    $('.order_now_button').on('click', () => {
      $.post('/order/order_now')
        .then((data) => {
          //can be added more features here
        })
        .catch((error) => {
          console.log('error = ', error);
        });
    })

    // $('.spicy_button').on('click', (event) => {
    //   customData.spiciness = $(event.target).attr('data');
    //   console.log(customData);
    // });

  });

  /* load cart */
  const showCart = (data) => {
    const $test = $('#cartRows');
    const $cartRowsSum = $('#cartRowsSum');
    $test.empty();
    $cartRowsSum.empty();
    // if cart is empty, disable order button and link
    if (data.cart === null){
      $('#order_now_button').attr("disabled", true);
      $('#order_now_button_link').removeAttr("href");
    } else {
      $('#order_now_button').attr("disabled", false);
      $('#order_now_button_link').attr("href", "/mypage");
    }

    //check if the cart is empty or not, if it's empty don't call renderCart()
    const appendContent = data.cart !== null ? renderCart(data) : '';
    const appendSum = data.cart !== null ? renderCartSum(data) : '';

    $test.append(appendContent).off('click').on('click', '.deleteBtn', (event) => {
      event.preventDefault();

      const data = event.target.getAttribute('data-custom-id');

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
          <td>$${data.cart[i]['price'].toFixed(2)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="ps-3">+${data.cart[i]['hot'] ? 'Hot' : 'Cold'} / ${data.cart[i]['item_size']} / Spiciness: ${data.cart[i]['spiciness']}</td>
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
    <td>$${(Number(data.cartTotal.sub_total) * 0.05).toFixed(2)}</td>
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
    const customData = {
      hot_cold: null,
      size: null,
      spiciness: null
    };

    $container.append(appendContent);

    let $customSlide;

    $('.accordion-button').on('click', (event) => {
      $customSlide = $(event.target);
      //custom slide up/down
      $customSlide.parent().siblings('.accordion-collapse').toggle();
      //remove the clicked status
      $('.btn-group').find('label').removeClass('active').end().find('[type="radio"]').prop('checked', false);
    })

    $('.hot_cold_button').on('click',(event) => {
      if (customData.menu_id !== $(event.target).parent('.btn-group').attr('data')) {
        customData.hot_cold = customData.hot_cold = $(event.target).attr('data');
        customData.size = null;
        customData.spiciness = null;
        customData.menu_id = $(event.target).parent('.btn-group').attr('data');
      } else {
        customData.hot_cold = $(event.target).attr('data');
      }
      console.log(customData);
    });

    $('.size_button').on('click', (event) => {
      if (customData.menu_id !== $(event.target).parent('.btn-group').attr('data')) {
        customData.hot_cold = null;
        customData.size = $(event.target).attr('data');
        customData.spiciness = null;
        customData.menu_id = $(event.target).parent('.btn-group').attr('data');
      } else {
        customData.size = $(event.target).attr('data');
      }
      console.log(customData);
    });

    $('.spicy_button').on('click', (event) => {
      if (customData.menu_id !== $(event.target).parent('.btn-group').attr('data')) {
        customData.hot_cold = null;
        customData.size = null;
        customData.spiciness = $(event.target).attr('data');
        customData.menu_id = $(event.target).parent('.btn-group').attr('data');
      } else {
        customData.spiciness = $(event.target).attr('data');
      }
      console.log(customData);
    });

    $('.confirm_button__').on('click', (event) => {
      event.preventDefault();
      if (Object.values(customData).some(e => e === null)) {
        alert('need to finish the customizations');
      } else if (customData.menu_id !== $(event.target).attr('data')) {
        alert('need to finish the customizations');
        customData.hot_cold = null;
        customData.size = null;
        customData.spiciness = null;
      } else {
        customData.menu_id = $(event.target).attr('data');
        console.log(customData);
        //remove the clicked status and slide up when user added the item to the cart
        $customSlide.parent().siblings('.accordion-collapse').toggle();
        $('.btn-group').find('label').removeClass('active').end().find('[type="radio"]').prop('checked', false);

        $.post('/order/add_cart', customData)
        .then((data) => {
          showCart(data);
        })
        .then()
        .catch((error) => {
          console.log('error = ', error);
        });
      }
    });

  }

  const renderMenu = (data) => {
    // console.log(data);
    let appendContent = '';
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      appendContent +=
      `
        <div class="menuScrollCard card p-5">
        <div class="photoAndTitle d-flex flex-row">
          <div class="image card w-50">
            <img id="dish_pic" src="${data[i].image_url}">
          </div>
          <div class="itemTitleAndPrice d-flex flex-column w-50 mt-5 mb-5">
            <p class="itemTitle text-end">${data[i].item_name}</p>
            <p class="itemPrice text-end">$${data[i].price.toFixed(2)}</p>
            <p class="itemDescr text-end">${data[i].description}</p>
          </div>





          <div class="accordion" id="accordionExample">
          <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-target="#collapseThree${i}" aria-expanded="false" aria-controls="collapseThree${i}">
                    Customizations
                  </button>
                  </h2>
              <div id="collapseThree${i}" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class="cutomizations_confirm d-flex flex-column mt-5 mb-5">
                <table class="table">
                  <h5>Customizations</h5>
                  <tbody>
                    <tr>

                      <td>Cold/Hot</td>
                      <td>
                      <div class="btn-group" role="group" aria-label="Basic radio toggle button group" data="${data[i].menu_id}">
                      <input type="radio" class="btn-check hot_cold_button" name="${data[i].item_name}-coldHot" id="${data[i].item_name}1" autocomplete="off" data=${true}>
                      <label class="btn btn-outline-primary" data=${true} for="${data[i].item_name}1">Hot</label>

                      <input type="radio" class="btn-check hot_cold_button" name="${data[i].item_name}-coldHot" id="${data[i].item_name}2" autocomplete="off" data=${false}>
                      <label class="btn btn-outline-primary" data=${false} for="${data[i].item_name}2">Cold</label>
                      </div>
                      </td>
                    </tr>
                    <tr>

                      <td class="">Size</td>
                      <td class="btn-group" role="group" aria-label="Basic radio toggle button group" data="${data[i].menu_id}">
                        <input type="radio" class="btn-check size_button" data="small" name="${data[i].item_name}-size" id="${data[i].item_name}3" autocomplete="off">
                        <label class="btn btn-outline-primary" for="${data[i].item_name}3">S</label>

                        <input type="radio" class="btn-check size_button" data="med" name="${data[i].item_name}-size" id="${data[i].item_name}4" autocomplete="off">
                        <label class="btn btn-outline-primary" for="${data[i].item_name}4">M</label>

                        <input type="radio" class="btn-check size_button" data="large" name="${data[i].item_name}-size" id="${data[i].item_name}5" autocomplete="off">
                        <label class="btn btn-outline-primary" for="${data[i].item_name}5">L</label>
                      </td>
                    </tr>
                    <tr>

                      <!-- Bootstrap Buttons won't show selected values, need to use javascript to do that later. -->
                      <td>Spicyness</td>
                      <td class="btn-group" role="group" aria-label="Basic radio toggle button group" data="${data[i].menu_id}">
                      <input type="radio" class="btn-check spicy_button" data="1" name="${data[i].item_name}-spicyness" id="${data[i].item_name}6" autocomplete="off">
                      <label class="btn btn-outline-primary" for="${data[i].item_name}6">🌶️</label>

                      <input type="radio" class="btn-check spicy_button" data="2" name="${data[i].item_name}-spicyness" id="${data[i].item_name}7" autocomplete="off">
                      <label class="btn btn-outline-primary" for="${data[i].item_name}7">🌶️🌶️</label>

                      <input type="radio" class="btn-check spicy_button" data="3" name="${data[i].item_name}-spicyness" id="${data[i].item_name}8" autocomplete="off">
                      <label class="btn btn-outline-primary" for="${data[i].item_name}8">🌶️🌶️🌶️</label>

                      <input type="radio" class="btn-check spicy_button" data="4" name="${data[i].item_name}-spicyness" id="${data[i].item_name}9" autocomplete="off">
                      <label class="btn btn-outline-primary" for="${data[i].item_name}9">🌶️🌶️🌶️🌶️</label>

                      <input type="radio" class="btn-check spicy_button" data="5" name="${data[i].item_name}-spicyness" id="${data[i].item_name}10" autocomplete="off">
                      <label class="btn btn-outline-primary" for="${data[i].item_name}10">🌶️🌶️🌶️🌶️🌶️</label>
                    </td>
                    </tr>
                  </tbody>
                </table>


              </div> <!-- customizations_confirm end -->
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



