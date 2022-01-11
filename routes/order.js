const express = require('express');
const router  = express.Router();

const { getCartDetails, getItemsByCategory } = require('./order_database');

module.exports = (db) => {

  const orderPageData = {};

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
        // console.log(orderPageData);
        res.json(orderPageData);
        // res.render('order', orderPageData);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get("/", (req, res) => {

    res.render('order');

  });

  return router;
};
