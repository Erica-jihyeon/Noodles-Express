const express = require('express');
const router  = express.Router();

const { getCartDetails, getItemsByCategory, orderList, addCart, isCart } = require('./order_database');

module.exports = (db) => {

  const orderPageData = {};

  // router.get("/data/orderlist", (req, res) => {

  //   orderList(db)
  //     .then(data => {
  //       console.log(data);
  //       return;
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get("/data", (req, res) => {

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
        console.log(orderPageData);
        res.json(orderPageData);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/", (req, res) => {

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
        res.render('order', orderPageData);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/add_cart", (req, res) => {
    const userId = req.session.user_id
    let orderListArr;
    let orderId;

    orderList(db)
      .then(data => {
        orderListArr = data;
        return getCartDetails(db, userId)
      })
      .then(data => {
        data.cart ? orderId = data.cart[0].order_id : orderId = null;
        return addCart(db, userId, orderId);
      })
      .then(data => {
        // console.log(data[0]);
        // send new item in the cart
        res.json(data[0]);
      })
  });

  router.get("/test", (req, res) => {
    const userId = req.session.user_id
    let orderListArr;
    let orderId;

    orderList(db)
      .then(data => {
        orderListArr = data;
        return isCart(db, userId)
      })
      .then(data => {
        console.log(data);
        data.cart ? orderId = data.cart[0].orders_id : orderId = null;
        return addCart(db, userId, orderId);
      })
      .then(data => {
        console.log(data[0]);
      })
  });



  return router;
};
