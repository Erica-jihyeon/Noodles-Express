INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (5, true, 'large', 1, 1);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'small', 1, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, false, 'large', 2, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'small', 2, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, false, 'med', 2, 4);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (2, true, 'large', 3, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (2, true, 'large', 3, 4);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (2, true, 'large', 3, 6);
------ test set ---
-- history 1
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (2, true, 'large', 7, 4);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 7, 5);
-- history 2
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 8, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 8, 3);
-- current order
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (2, true, 'med', 9, 1);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (5, true, 'small', 9, 5);
-- cart
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 10, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 10, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 10, 6);

INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 11, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 11, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 11, 6);

INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 12, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 12, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 12, 6);

INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 13, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 13, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 13, 6);

INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 14, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 14, 3);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (4, true, 'small', 14, 6);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (1, true, 'large', 14, 2);
INSERT INTO customizations (spiciness, hot, item_size, order_id, menu_item_id) VALUES (3, true, 'med', 14, 3);
