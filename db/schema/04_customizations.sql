DROP TABLE IF EXISTS customizations CASCADE;

CREATE TABLE customizations (
  id SERIAL PRIMARY KEY NOT NULL,
  spiciness INTEGER NOT NULL,
  hot BOOLEAN NOT NULL,
  item_size VARCHAR(10) NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  menu_item_id INTEGER REFERENCES menu_items(id)
);
