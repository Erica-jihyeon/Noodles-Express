-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS customizations CASCADE;

CREATE TABLE customizations (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id),
  spiciness INTEGER,
  hot BOOLEAN,
  item_size VARCHAR(10),
);
