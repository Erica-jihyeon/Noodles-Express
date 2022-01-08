DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  order_time DATETIME NOT NULL,
  pick_up_time DATETIME NOT NULL,
  order_status VARCHAR(255)
);
