INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (1, '2021-12-01T08:00:00.000Z', '2021-12-01T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (2, '2021-12-02T08:00:00.000Z', '2021-12-02T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (3, '2021-12-03T08:00:00.000Z', '2021-12-03T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (4, '2021-12-04T08:00:00.000Z', '2021-12-04T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (5, '2021-12-05T08:00:00.000Z', '2021-12-05T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (6, '2021-12-06T08:00:00.000Z', '2021-12-06T09:00:00.000Z', 'complete');

---- test set ---
--history
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (7, '2021-12-09T08:00:00.000Z', '2021-12-09T09:00:00.000Z', 'complete');
INSERT INTO orders (user_id, order_time, pick_up_time, order_status) VALUES (7, '2021-12-10T08:00:00.000Z', '2021-12-10T09:00:00.000Z', 'complete');
--current order
INSERT INTO orders (user_id, order_time,order_status) VALUES (7, '2022-01-09T08:00:00.000Z', 'Preparing your meal');
--cart
INSERT INTO orders (user_id) VALUES (7);
