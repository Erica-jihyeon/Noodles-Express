DROP TABLE IF EXISTS orders_items CASCADE;

CREATE TABLE orders_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  menu_item_id INTEGER REFERENCES menu_items(id),
);
