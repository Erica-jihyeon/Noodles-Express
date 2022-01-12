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

const getPrevOrders = function(db, userID) {
  const prevOrdersQuery1 = `SELECT DISTINCT orders.id as order_id, order_time as date, pick_up_time, order_status, sum(menu_items.price), users.phone, CONCAT(users.first_name,' ', users.last_name) as name
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND pick_up_time IS NOT NULL
  GROUP BY orders.id, users.phone, users.first_name, users.last_name
  ORDER BY order_id DESC;
  `;
  
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
