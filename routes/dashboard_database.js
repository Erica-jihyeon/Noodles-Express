const { query } = require('express');

const getAllOrders = function(db) {
  const queryStr = `
  SELECT orders.id as order_id, order_time, pick_up_time, order_status, users.phone, users.id as user_id FROM orders JOIN users ON orders.user_id = users.id ORDER BY orders.id`;

  return db
    .query(queryStr)
    .then((data) => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
  });
}
exports.getAllOrders = getAllOrders;

const updateOrderTable = function(db, cookingTime, orderId) {

  const queryStr = `UPDATE orders SET pick_up_time=order_time + $1 * INTERVAL '1 min', order_status='Preparing your meal' WHERE id=$2 RETURNING*`;
  const queryParam = [cookingTime, orderId];

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        return data.rows[0];
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.updateOrderTable = updateOrderTable;
