const express = require('express');
const { getCurrentOrdersDetails, getPrevOrders } = require('./dashboard_database');
const router  = express.Router();

module.exports = (db) => {

  const templateVars = {};

  router.get("/", (req, res) => {

    const userID = Number(req.session.user_id);
    getCurrentOrdersDetails(db, userID)
      .then(data => {
        const currentOrders = {};
        for (const row of data.currentOrderTotal) {
          if (row.order_id in currentOrders) {
            currentOrders[row.order_id].push(row);
          } else {
            currentOrders[row.order_id] = [row];
          }
        }
        templateVars.currentOrder = data.currentOrder;
        templateVars.currentOrderTotal = currentOrders;
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
        console.log(templateVars);
        console.log(templateVars.prevOrdersDetail);


        res.render('dashboard.ejs', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
