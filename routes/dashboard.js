const express = require('express');
const { getAllOrders, updateOrderTable, completeOrder } = require('./dashboard_database');
const { send_sms } = require('./send_sms');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {

    getAllOrders(db)
      .then(data => {
        // console.log(data);
        const orders = {};
        for (const row of data) {
          if (row.order_id in orders) {
            orders[row.order_id].push(row);
          } else {
            orders[row.order_id] = [row];
          }
        }

        // console.log(orders);
        res.render('dashboard', {data: orders});
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
    console.log(req.body);
    let cookingTime = req.body.mintuesTxtBox;
    let orderId = req.body.orderID;
    let customerPhone = req.body.phone;
    let result = {};

    let pickUpTime;
    let message;


    updateOrderTable(db, cookingTime, orderId)
      .then(data => {
        pickUpTime = data.pick_up_time;
        message = data.order_status + '. It will be ready for pick up at :' + pickUpTime;
        send_sms(message, customerPhone);
        res.redirect("/dashboard")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/complete", (req, res) => {

    let orderId = req.body.orderID;
    let result = {};

    completeOrder(db, orderId)
      .then(data => {
        res.redirect("/dashboard")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  // testing
  // router.get("/update", (req, res) => {
  //   //need to get from the owner (userId, orderId, cookingTime)
  //   const userId = req.session.user_id;
  //   let cookingTime = 30;
  //   let orderId = 12;
  //   let result = {};

  //   updateOrderTable(db, cookingTime, orderId)
  //     .then(data => {
  //       console.log(data);
  //       res.redirect("/dashboard")
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });



  return router;
};
