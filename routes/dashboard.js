const { Router } = require('express');
const express = require('express');
const { route } = require('express/lib/application');
const { getAllOrders, updateOrderTable, completeOrder, addMenu, getAllMenu, deleteMenu } = require('./dashboard_database');
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




  router.get("/add_menu", (req, res) => {

    getAllMenu(db)
      .then((data) => {
        console.log(data);
        res.render('add_menu', {data});
      })

  })

  router.post("/add_menu", (req, res) => {
    //get req body -> redirect(anchor at ejs)
    if (Object.values(req.body).some(e => e === '')) {
      res.redirect('/dashboard/add_menu');
    } else  {
      addMenu(db, { ...req.body })
      .then((data) => {
        res.redirect("/dashboard/add_menu");
      })
    }
    console.log(req.body);
  })

  router.post("/delete_menu", (req, res) => {
    //get req body -> redirect(anchor at ejs)
    const menuId = req.body.menu_id;
    console.log(menuId);
    deleteMenu(db, menuId)
      .then((data) => {
        res.redirect("/dashboard/add_menu");
      })

  })




  return router;
};
