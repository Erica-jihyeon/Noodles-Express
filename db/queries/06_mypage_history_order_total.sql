SELECT order_id, SUM(price) as sub_total
FROM menu_items
JOIN customizations ON menu_items.id = menu_item_id
JOIN orders ON orders.id = order_id
WHERE user_id = 7 AND pick_up_time IS NOT NULL
GROUP BY order_id
ORDER BY order_id DESC;
