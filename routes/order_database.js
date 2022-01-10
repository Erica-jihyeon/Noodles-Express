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

  const orderPageData = {};

  return db
    .query(cartQuery, queryParam)
      .then((data) => {
        if (data.rows.length === 0) {
          orderPageData.cart = null;
        } else {
          orderPageData.cart = data.rows;
        }
        return db.query(cartTotalQuery, queryParam)
      })
      .then((data) => {
        if (data.rows.length === 0) {
          orderPageData.cartTotal = null;
        } else {
          orderPageData.cartTotal = data.rows;
        }
        return orderPageData;
      })
      .catch(err => {
        console.log(err.message);
  });
}
exports.getCartDetails = getCartDetails;

const getItemsByCategory = function (db) {
  const queryString1 = `SELECT thumbnail_url, item_name, price, category, description
  FROM menu_items
  WHERE category = 'appetizer';`;
  const queryString2 = `SELECT thumbnail_url, item_name, price, category, description
  FROM menu_items
  WHERE category = 'main';`;
  const queryString3 = `SELECT thumbnail_url, item_name, price, category, description
  FROM menu_items
  WHERE category = 'drink';`;
  const queryString4 = `SELECT thumbnail_url, item_name, price, category, description
  FROM menu_items
  WHERE category = 'dessert';`;

  const allMenuData = {};

  return db
    .query(queryString1)
    .then((data) => {
      allMenuData.appetizer = data.rows
      return db.query(queryString2);
    })
    .then((data) => {
      allMenuData.main = data.rows
      return db.query(queryString3);
    })
    .then((data) => {
      allMenuData.drink = data.rows
      return db.query(queryString4);
    })
    .then((data) => {
      allMenuData.dessert = data.rows
      return allMenuData;
    })
    .catch(err => {
      console.log(err.message);
    });
}
exports.getItemsByCategory = getItemsByCategory;
