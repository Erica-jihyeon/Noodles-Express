const express = require('express');
const { getAllOrders, updateOrderTable } = require('./dashboard_database');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

    getAllOrders(db)
      .then(data => {
        // console.log(data);
        res.render('dashboard', {data});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/update", (req, res) => {
    //need to get from the owner (userId, orderId, cookingTime)
    const userId = req.session.user_id;
    let cookingTime = 30;
    let orderId = 10;
    let result = {};

    updateOrderTable(db, cookingTime, orderId)
      .then(data => {
        res.redirect("/dashboard")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/update", (req, res) => {
    //need to get from the owner (userId, orderId, cookingTime)
    const userId = req.session.user_id;
    let cookingTime = 30;
    let orderId = 12;
    let result = {};

    updateOrderTable(db, cookingTime, orderId)
      .then(data => {
        console.log(data);
        res.redirect("/dashboard")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
