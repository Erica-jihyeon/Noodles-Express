const { query } = require('express');

const getAllOrders = function(db) {

  const queryStr = `
  SELECT orders.id as order_id, users.id as user_id, users.first_name, users.last_name, users.phone, orders.order_time, orders.pick_up_time, orders.order_status, customizations.spiciness, customizations.hot, customizations.item_size, menu_items.item_name, total_table.total
  FROM orders
  JOIN users ON user_id = users.id
  JOIN customizations ON order_id = orders.id
  JOIN (SELECT orders.id as order_id, sum(menu_items.price) as total
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  RIGHT JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  GROUP BY orders.id) as total_table ON total_table.order_id = orders.id
  JOIN menu_items ON customizations.menu_item_id = menu_items.id
  ORDER BY orders.id DESC`;

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

const completeOrder = function(db, orderId) {

  const queryStr = `UPDATE orders SET order_status='complete' WHERE id=$1`;
  const queryParam = [orderId];

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        return;
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.completeOrder = completeOrder;
