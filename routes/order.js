const express = require('express');
const router = express.Router();

const { getCartDetails, getItemsByCategory, addCart, isCart, deleteItemFromCart, orderNow, findUserInfo } = require('./order_database');
const { send_sms } = require('./send_sms');

// let ownerPhoneNum = '7786813760';
// const message = 'New order! Please check your dashboard!';
// //need to send a message
// send_sms(message ,ownerPhoneNum);

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
        console.log(orderPageData)
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
    console.log('req.body', req.body);

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        data.cart ? orderId = data.cart[0].orders_id : orderId = null;
        return addCart(db, userId, orderId, { ...req.body });
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
    const customId = req.body.data;
    const result = {};

    isCart(db, userId)
      .then(data => {
        console.log(`current cart: `, data);
        return deleteItemFromCart(db, customId, data.cart[0].orders_id);
      })
      .then(data => {
        console.log(`left in cart: `, data.length);
        if (data.length === 0) {
          result.cart = null;
          result.cartTotal = null;
          return result;
        } else {
          return getCartDetails(db, userId)
        }
      })
      .then(data => {
        result.cart = data ? data.cart : null;
        console.log('data = ', data)
        result.cartTotal = data.cart ? data.cartTotal[0] : null;
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
    let orderId;
    let result = {};

    isCart(db, userId)
      .then(data => {
        orderId = data.cart[0].orders_id;
        return orderNow(db, orderId)
      })
      .then(data => {
        console.log(data);
        result.orderData = data;
        return findUserInfo(db, userId);
      })
      .then(data => {
        result.users = data;
        console.log(`order status`, result);
        res.json(result);
      })
      .then(() => {
        let ownerPhoneNum = '7786813760';
        const message = 'New order! Please check your dashboard!';
        //need to send a message
        send_sms(message, ownerPhoneNum);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
