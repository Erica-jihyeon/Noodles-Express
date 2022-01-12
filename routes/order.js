const express = require('express');
const router  = express.Router();

const { getCartDetails, getItemsByCategory, addCart, isCart, deleteItemFromCart, orderNow } = require('./order_database');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const orderPageData = {};
    getCartDetails(db, req.session.user_id)
      .then(data => {
        // console.log(data);
        orderPageData.cart = data.cart;
        orderPageData.cartTotal = data.cartTotal === null ? data.cartTotal : data.cartTotal[0];

        return getItemsByCategory(db);
      })
      .then(data => {
        // console.log(data);
        orderPageData.appetizer = data.appetizer;
        orderPageData.main = data.main;
        orderPageData.drink = data.drink;
        orderPageData.dessert = data.dessert;
        res.render('order');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/cart/:id", (req, res) => {
    const cartData = {};
    getCartDetails(db, req.session.user_id)
      .then(data => {
        // console.log(data);
        cartData.cart = data.cart;
        cartData.cartTotal = data.cartTotal === null ? data.cartTotal : data.cartTotal[0];
        res.json(cartData);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/data", (req, res) => {
    const orderPageData = {};
    getCartDetails(db, req.session.user_id)
      .then(data => {
        // console.log(data);
        orderPageData.cart = data.cart;
        orderPageData.cartTotal = data.cartTotal === null ? data.cartTotal : data.cartTotal[0];

        return getItemsByCategory(db);
      })
      .then(data => {
        // console.log(data);
        orderPageData.appetizer = data.appetizer;
        orderPageData.main = data.main;
        orderPageData.drink = data.drink;
        orderPageData.dessert = data.dessert;
        // console.log(orderPageData);
        res.json(orderPageData);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  router.post("/add_cart", (req, res) => {
    const userId = req.session.user_id
    let orderId;
    const result = {};

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        data.cart ? orderId = data.cart[0].orders_id : orderId = null;
        return addCart(db, userId, orderId);
      })
      .then(data => {
        console.log(`added to the cart: `, data[0]);
        return getCartDetails(db, userId)
      })
      .then(data => {
        result.cart = data.cart;
        result.cartTotal = data.cartTotal[0];
        console.log(`all info in the cart: `, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/delete_cart", (req, res) => {
    const userId = req.session.user_id
    // need to get from front-end
    let customId = 16;
    const result = {};

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        return deleteItemFromCart(db, customId);
      })
      .then(data => {
        console.log(`deleted from the cart: `, data[0]);
        return getCartDetails(db, userId)
      })
      .then(data => {
        result.cart = data.cart;
        result.cartTotal = data.cartTotal[0];
        console.log(`all info in the cart: `, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/order_now", (req, res) => {
    const userId = req.session.user_id;
    let orderTime = new Date().toISOString();
    let cookingTime = 30;
    //need to get orderId from front-end
    let orderId = 10;
    let result = {};

    orderNow(db, orderTime, orderId)
      .then(data => {
        result.cookingTime = cookingTime;
        result.orderData = data;
        console.log(`order status`, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  /** TESTING code */
  // add_cart post testing
  router.get("/test", (req, res) => {
    const userId = req.session.user_id
    let orderId;
    const result = {};

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        data.cart ? orderId = data.cart[0].orders_id : orderId = null;
        return addCart(db, userId, orderId);
      })
      .then(data => {
        console.log(`added to the cart: `, data[0]);
        return getCartDetails(db, userId)
      })
      .then(data => {
        result.cart = data.cart;
        result.cartTotal = data.cartTotal[0];
        console.log(`all info in the cart: `, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // delete_cart post testing
  router.get("/testd", (req, res) => {
    const userId = req.session.user_id
    let customId = 16;
    const result = {};

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        return deleteItemFromCart(db, customId);
      })
      .then(data => {
        console.log(`deleted from the cart: `, data[0]);
        return getCartDetails(db, userId)
      })
      .then(data => {
        result.cart = data.cart;
        result.cartTotal = data.cartTotal[0];
        console.log(`all info in the cart: `, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

   // order now route testing
   router.get("/testo", (req, res) => {
    const userId = req.session.user_id;
    let orderTime = new Date().toISOString();
    let cookingTime = 30;
    //need to get orderId from front-end
    let orderId = 10;
    let result = {};

    orderNow(db, orderTime, orderId)
      .then(data => {
        result.cookingTime = cookingTime;
        result.orderData = data;
        console.log(`order status`, result);
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
