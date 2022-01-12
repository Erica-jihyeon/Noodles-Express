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

    $('.deleteBtn').on('click', () => {
      // prevent the submit button from submitting
      console.log('hi');
      // event.preventDefault();
      // const data = $(this).attr('data-custom-id');

      // console.log('data is here', data)

      //  $.post("/order/delete_cart", {data})
      //   .then(() => { loadCart(); } )
      //
      //
      //   $.ajax({
      //     type: "POST",
      //     url: `/delete_cart`,
      //     data: data,
      //   })
      //     .then((response) => {
      //       loadCart()
      //     })
      //     .catch((error) => {
      //     });
    });


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
    $test.append(appendContent).on('click', '.deleteBtn', (event) => {
      event.preventDefault();
      console.log($('.deleteBtn'))
      const data = $('.deleteBtn').attr('data-custom-id');
      console.log('data is here', data);
      $.post("/order/delete_cart", {data})
      .then((data) => { showCart(data); } )
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
        <td class="ps-3 pt-0 pb-0">+${data.cart[i]['hot']?'Hot':'Cold'}</td>
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
    <td>$${Number(data.cartTotal.sub_total)*0.05.toFixed(2)}</td>
  </tr>
  <tr>
    <td></td>
    <td class="text-end">Total</td>
    <td>$${(Number(data.cartTotal.sub_total)*0.05 + Number(data.cartTotal.sub_total)).toFixed(2)}</td>
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
        </div>

        <div class="cutomizations_confirm d-flex flex-column mt-5 mb-5">
        <table class="table">
          <h5>Customizations</h5>
          <tbody>
            <tr>
              <td></td>
              <td>Cold/Hot</td>
              <td class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">Hot</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">Cold</label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="">Size</td>
              <td class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio2" id="btnradio3" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio3">S</label>

                <input type="radio" class="btn-check" name="btnradio2" id="btnradio4" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio4">M</label>

                <input type="radio" class="btn-check" name="btnradio2" id="btnradio5" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio5">L</label>
              </td>
            </tr>
            <tr>
              <td></td>
              <!-- Bootstrap Buttons won't show selected values, need to use javascript to do that later. -->
              <td>Spicyness</td>
              <td class="dropdown">
                <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Spicyness
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Mild</a></li>
                  <li><a class="dropdown-item" href="#">Medium</a></li>
                  <li><a class="dropdown-item" href="#">Spicy</a></li>
                  <li><a class="dropdown-item" href="#">Extra Spicy</a></li>
                  <li><a class="dropdown-item" href="#">Extra Extra Spicy</a></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="confirm_button d-flex justify-content-end">
          <i class="bi bi-x-lg h3 m-3"></i>
          <i class="bi bi-cart-plus h3 m-3"></i>
        </div>

      </div> <!-- customizations_confirm end -->
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



