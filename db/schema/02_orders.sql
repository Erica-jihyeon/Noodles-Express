DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  order_time TIMESTAMP,
  pick_up_time TIMESTAMP,
  order_status VARCHAR(255) DEFAULT 'In Cart'
);

--order_time is null -> itmes in cart
--order_time is not null & pick_up_time is null -> not completed
--order_time is not null & pick_up_time is not null -> completed
