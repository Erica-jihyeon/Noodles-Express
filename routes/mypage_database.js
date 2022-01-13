const { query } = require('express');

const getCurrentOrdersDetails = function(db, userID) {
  // const currentOrderQuery = `
  // SELECT DISTINCT orders.id as order_id, order_time as date, pick_up_time, order_status, sum(menu_items.price)
  // FROM customizations
  // JOIN menu_items ON menu_items.id = menu_item_id
  // JOIN orders ON orders.id = order_id
  // JOIN users ON users.id = user_id
  // WHERE users.id = $1 AND order_time IS NOT NULL AND pick_up_time IS NULL
  // GROUP BY orders.id
  // ORDER BY order_id DESC;
  // `;

  // const currentOrderTotalQuery = `
  // SELECT orders.id as order_id, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot
  // FROM customizations
  // JOIN menu_items ON menu_items.id = menu_item_id
  // JOIN orders ON orders.id = order_id
  // JOIN users ON users.id = user_id
  // WHERE users.id = $1 AND pick_up_time IS NULL AND order_time IS NOT NULL
  // ORDER BY order_id DESC;
  // `;
  const currentOrderQuery = `
  SELECT DISTINCT orders.id as order_id, order_time as date, pick_up_time, order_status, sum(menu_items.price)
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND order_time IS NOT NULL AND (order_status='ordered' OR order_status='Preparing your meal')
  GROUP BY orders.id
  ORDER BY order_id DESC;
  `;

  const currentOrderTotalQuery = `
  SELECT orders.id as order_id, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND order_time IS NOT NULL AND (order_status='ordered' OR order_status='Preparing your meal')
  ORDER BY order_id DESC;
  `;

  const queryParam = [userID];

  const templateVars = {};

  return db
    .query(currentOrderQuery, queryParam)
    .then((data) => {
      if (data.rows.length === 0) {
        templateVars.currentOrder = null;
      } else {
        templateVars.currentOrder = data.rows;
      }
      return db.query(currentOrderTotalQuery, queryParam)
    })
    .then((data) => {
        templateVars.currentOrderTotal = data.rows;
      return templateVars;
    })
    .catch(err => {
      console.log(err.message);
  });
}
exports.getCurrentOrdersDetails = getCurrentOrdersDetails;


const getPrevOrders = function(db, userID) {
  const prevOrdersQuery1 = `SELECT DISTINCT orders.id as order_id, order_time as date, pick_up_time, order_status, sum(menu_items.price)
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND pick_up_time IS NOT NULL AND order_status='complete'
  GROUP BY orders.id
  ORDER BY order_id DESC;
  `;

  const prevOrdersQuery2 = `SELECT orders.id as order_id, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND pick_up_time IS NOT NULL
  ORDER BY order_id DESC;
  `;
  const queryParam = [userID];

  const templateVars = {};
  const orderIdList = [];
  return db
    .query(prevOrdersQuery1, queryParam)
    .then((data) => {
      if (data.rows.length === 0) {
        templateVars.prevOrders = null;
      } else {
        templateVars.prevOrders = data.rows;
      }

      return db.query(prevOrdersQuery2, queryParam)
    })
    .then((data) => {
      templateVars.prevDetails = data.rows;
      return templateVars;
    })
}
exports.getPrevOrders = getPrevOrders;
