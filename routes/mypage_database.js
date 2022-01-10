
const getCurrentOrdersDetails = function(db, userID) {
  const currentOrderQuery = `SELECT orders.id as order_id, order_time, pick_up_time, order_status, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot, users.id as user_id
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND order_time IS NOT NULL AND pick_up_time IS NULL;
  `;

  const currentOrderTotalQuery = `SELECT order_id, SUM(price) as sub_total
  FROM menu_items
  JOIN customizations ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  WHERE user_id = $1 AND pick_up_time IS NULL AND order_time IS NOT NULL
  GROUP BY order_id
  ORDER BY order_id;`
  ;

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
      if (data.rows.length === 0) {
        templateVars.currentOrderTotal = null;
      } else {
        templateVars.currentOrderTotal = data.rows;
      }
      return templateVars;
    })
    .catch(err => {
      console.log(err.message);
  });
}
exports.getCurrentOrdersDetails = getCurrentOrdersDetails;


const getPrevOrdersDetails = function(db, userID) {
  const prevOrdersQuery = `SELECT orders.id as order_id, order_time as date, pick_up_time, order_status, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot, users.id as user_id
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND pick_up_time IS NOT NULL
  ORDER BY order_id DESC;
  `;

  const prevOrdersTotalsQuery = `SELECT order_id, SUM(price) as sub_total
  FROM menu_items
  JOIN customizations ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  WHERE user_id = $1 AND pick_up_time IS NOT NULL
  GROUP BY order_id
  ORDER BY order_id DESC;
  `;

  const queryParam = [userID];

  const templateVars = {};

  return db
    .query(prevOrdersQuery, queryParam)
    .then((data) => {
      if (data.rows.length === 0) {
        templateVars.prevOrders = null;
      } else {
        templateVars.prevOrders = data.rows;
      }
      return db.query(prevOrdersTotalsQuery, queryParam)
    })
    .then((data) => {
      if (data.rows.length === 0) {
        templateVars.prevOrdersTotals = null;
      } else {
        templateVars.prevOrdersTotals = data.rows;
      }
      return templateVars;
    })

}
exports.getPrevOrdersDetails = getPrevOrdersDetails;
