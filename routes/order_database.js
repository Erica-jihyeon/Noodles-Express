const order = require('./order');

const getCartDetails = function(db, userID) {
  const cartQuery = `SELECT orders.id as order_id, order_time as date, pick_up_time, order_status, menu_items.item_name as item, price, customizations.spiciness, customizations.item_size, customizations.hot, users.id as user_id, customizations.id as custom_id, menu_items.id as menu_id
  FROM customizations
  JOIN menu_items ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1 AND order_time IS NULL`;

  const cartTotalQuery = `SELECT order_id, SUM(price) as sub_total
  FROM menu_items
  JOIN customizations ON menu_items.id = menu_item_id
  JOIN orders ON orders.id = order_id
  WHERE user_id = $1 AND order_time IS NULL
  GROUP BY order_id
  ORDER BY order_id`
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
  const queryString1 = `SELECT thumbnail_url, image_url, item_name, price, category, description, id as menu_id
  FROM menu_items
  WHERE category = 'appetizer'`;
  const queryString2 = `SELECT thumbnail_url, image_url, item_name, price, category, description, id as menu_id
  FROM menu_items
  WHERE category = 'main'`;
  const queryString3 = `SELECT thumbnail_url, image_url, item_name, price, category, description, id as menu_id
  FROM menu_items
  WHERE category = 'drink'`;
  const queryString4 = `SELECT thumbnail_url, image_url, item_name, price, category, description, id as menu_id
  FROM menu_items
  WHERE category = 'dessert'`;

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

//////////////////
//need info => spiciness, hot, item_size, menu_item_id
const addCart = function(db, userID, orderId, custom) {
  console.log(custom);

  const newCartQuery = orderId ? `SELECT id FROM orders WHERE user_id = $1` : `INSERT INTO orders (user_id) VALUES ($1) RETURNING *`;
  const addItemsQuery = `INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`

  const queryParam1 = [userID];
  const queryParam2 = [custom.spiciness, custom.hot_cold, custom.size, orderId, custom.menu_id];
  return db
    .query(newCartQuery, queryParam1)
      .then((data) => {
        // console.log(data.rows[0].id);
        orderId ? queryParam2[3] = orderId : queryParam2[3] = data.rows[0].id;
        return db.query(addItemsQuery, queryParam2);
      })
      .then((data) => {
        return data.rows;
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.addCart = addCart;


//
const isCart = function(db, userID) {
  const queryStr = `SELECT id as orders_id FROM orders WHERE user_id = $1 AND order_time IS NULL`;

  const queryParam = [userID];

  const cartData = {};

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        if (data.rows.length === 0) {
          cartData.cart = null;
        } else {
          cartData.cart = data.rows;
        }
        return cartData;
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.isCart = isCart;


const deleteItemFromCart = function(db, customId, orderId) {
  const queryStr = `DELETE FROM customizations WHERE id=$1`;
  const queryStr2 = `SELECT id FROM customizations WHERE order_id=$1`
  const queryParam = [customId];
  const queryParam2 = [orderId];

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        return db.query(queryStr2, queryParam2);
      })
      .then((data) => {
        return data.rows;
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.deleteItemFromCart = deleteItemFromCart;

const orderNow = function(db, orderId) {

  const queryStr = `UPDATE orders SET order_time=current_timestamp WHERE id=$1 RETURNING*`;
  const queryParam = [orderId];

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        return data.rows[0];
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.orderNow = orderNow;

const findUserInfo = function(db, userId) {

  const queryStr = `SELECT * FROM users WHERE id=$1`;
  const queryParam = [userId];

  return db
    .query(queryStr, queryParam)
      .then((data) => {
        return data.rows[0];
      })
      .catch(err => {
        console.log(err.message);
      });
}
exports.findUserInfo = findUserInfo;


// UPDATE orders SET order_time='2022-01-09T08:00:00.000Z', pick_up_time=order_time + 30 * INTERVAL '1 min', order_status='Preparing your meal' WHERE id=10 RETURNING*
// UPDATE orders SET order_time=current_timestamp, pick_up_time=order_time + 30 * INTERVAL '1 min', order_status='Preparing your meal' WHERE id=10 RETURNING*
// UPDATE orders SET order_time='2022-01-12T19:20:42.000Z', pick_up_time=order_time + INTERVAL '30 min', order_status='Preparing your meal' WHERE id=10 RETURNING*
