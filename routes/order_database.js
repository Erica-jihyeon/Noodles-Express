const getCartDetails = function(db, userID) {
  const cartQuery = `SELECT orders.id as order_id, order_time as date, pick_up_time, order_status, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot, users.id as user_id
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND order_time IS NULL;`;

  const cartTotalQuery = `SELECT order_id, SUM(price) as sub_total
  FROM menu_items
  JOIN customizations ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  WHERE user_id = $1 AND order_time IS NULL
  GROUP BY order_id
  ORDER BY order_id;`
  ;

  const queryParam = [userID];

  const templateVars = {};

  return db
    .query(cartQuery, queryParam)
      .then((data) => {
        if (data.rows.length === 0) {
          templateVars.cart = null;
        } else {
          templateVars.cart = data.rows;
        }
        return db.query(cartTotalQuery, queryParam)
      })
      .then((data) => {
        if (data.rows.length === 0) {
          templateVars.cartTotal = null;
        } else {
          templateVars.cartTotal = data.rows;
        }
        return templateVars;
      })
      .catch(err => {
        console.log(err.message);
  });
}
exports.getCartDetails = getCartDetails;

const getItemsByCategory = function (db, category) {
  const queryString = `SELECT thumbnail_url, item_name, price, category, description
  FROM menu_items
  WHERE category = $1;`;

  const queryParam = [category];

  const templateVars = {};

  return db
    .query(queryString, queryParam)
    .then((data) => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.getItemsByCategory = getItemsByCategory;
