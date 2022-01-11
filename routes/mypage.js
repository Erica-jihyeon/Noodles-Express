const express = require('express');
const { getCurrentOrdersDetails, getPrevOrders } = require('./mypage_database');
const router  = express.Router();

module.exports = (db) => {

  const templateVars = {};

  router.get("/", (req, res) => {

    const userID = Number(req.session.user_id);
    getCurrentOrdersDetails(db, userID)
      .then(data => {
        templateVars.currentOrder = data.currentOrder;
        templateVars.currentOrderTotal = data.currentOrderTotal === null ? data.currentOrderTotal : data.currentOrderTotal[0];
        return getPrevOrders(db, userID);
      })
      .then(data => {
        const prevOrders = {};
        for (const row of data.prevDetails) {
          if (row.order_id in prevOrders) {
            prevOrders[row.order_id].push(row);
          } else {
            prevOrders[row.order_id] = [row];
          }
        }

        templateVars.prevOrders = data.prevOrders;
        templateVars.prevOrdersDetail = prevOrders;
        templateVars.orderIdList = data.orderIdList;
        console.log(templateVars);
        console.log(templateVars.prevOrdersDetail);


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
