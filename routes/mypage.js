const express = require('express');
const { getCurrentOrdersDetails, getPrevOrdersDetails } = require('./mypage_database');
const router  = express.Router();

module.exports = (db) => {

  const templateVars = {};

  router.get("/", (req, res) => {
    //getCurrentOrdersDetails(db, req.session.user_id)
    getCurrentOrdersDetails(db, 7)
      .then(data => {
        templateVars.currentOrder = data.currentOrder;
        templateVars.currentOrderTotal = data.currentOrderTotal === null ? data.currentOrderTotal : data.currentOrderTotal[0];
        //return getPrevOrdersDetails(db, req.session.user_id)
        return getPrevOrdersDetails(db, 7);
      })
      .then(data => {
        templateVars.prevOrders = data.prevOrders;
        templateVars.prevOrdersTotals = data.prevOrdersTotals;
        console.log(templateVars);
        res.render('mypage', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
