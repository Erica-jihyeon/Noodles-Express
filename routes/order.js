const express = require('express');
const router  = express.Router();

const { getCartDetails, getItemsByCategory } = require('./order_database');

module.exports = (db) => {

  const templateVars = {};

  router.get("/", (req, res) => {

    //getCartDetails(db, req.session.user_id)
    getCartDetails(db, 7)
      .then(data => {
        // console.log(data);
        templateVars.cart = data.cart;
        templateVars.cartTotal = data.cartTotal === null ? data.cartTotal : data.cartTotal[0];
        //return getItemsByCategory(db, req.session.category)
        return getItemsByCategory(db, 'main');
      })
      .then(data => {
        // console.log(data);
        for(let i = 0; i < data.length; i++) {
          templateVars[`item${i+1}`] = data[i];
        }
        console.log(templateVars);
        res.render('order', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
