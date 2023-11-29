INSERT INTO shoe_listings(user_id, title, description, brand, is_featured, size, price, condition, is_sold, city, postal_code, thumbnail_url, cover_url, is_deleted)
VALUES (3, 'Running Shoes', 'High-performance running shoes', 'Nike', true, 9.5, 79.99, 'New', false, 'New York', '10001', 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200', false),
(5, 'Casual Sneakers', 'Comfortable everyday sneakers', 'Adidas', false, 8, 49.99, 'Like New', false, 'Los Angeles', '90001', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600', false),
(7, 'Basketball Shoes', 'Premium basketball shoes for sale', 'Jordan', true, 10, 129.99, 'Excellent', false, 'Chicago', '60601', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNob2VzfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNob2VzfGVufDB8fDB8fHww', false),
(3, 'Hiking Boots', 'Durable boots for outdoor adventures', 'Merrell', false, 11, 89.99, 'Used', true, 'New York', '10001', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww', false),
(5, 'Flip Flops', 'Comfortable flip flops for the beach', 'Havaianas', false, 7, 19.99, 'Like New', false, 'Los Angeles', '90001', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D', true),
(7, 'Dress Shoes', 'Elegant dress shoes for special occasions', 'Allen Edmonds', false, 9, 149.99, 'Excellent', true, 'Chicago', '60601', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', false),
(3, 'Skate Shoes', 'Stylish skate shoes for skateboarders', 'Vans', true, 8.5, 59.99, 'Used', false, 'New York', '10001', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', false),
(5, 'Winter Boots', 'Insulated boots for cold weather', 'Columbia', false, 10, 109.99, 'New', false, 'Los Angeles', '90001', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob2VzfGVufDB8fDB8fHww', false);

INSERT INTO messages(shoe_listings_id, sender_id, receiver_id, content, timestamp)
VALUES (1, 1, 3, 'Hi, is this shoe sold yet?', '2023-11-23 14:20:00'),
(1, 3, 1, 'No, this is still available. Are you interested?', '2023-11-24 09:45:00'),
(4, 2, 3, 'Can I still buy these boots?', '2021-11-10 14:20:00'),
(8, 4, 5, 'Do you have these in size 11?', '2022-01-30 08:15:00'),
(3, 6, 7, 'I am interested in these basketball shoes but can I get a 10% discount?', '2022-12-22 18:25:00'),
(6, 8, 7, 'I see this is sold but do you have another pair available?', '2023-11-27 16:20:00'),
(6, 7, 8, 'No, sorry', '2023-11-28 11:05:00'),
(2, 3, 5, 'I am interested in buying this, do you ship to New York?', '2023-11-30 10:25:00');

INSERT INTO favourites(user_id, shoe_listings_id)
VALUES (1, 1),
(2, 4),
(2, 3),
(6, 1),
(6, 6),
(4, 3),
(3, 4),
(8, 1);


VALUES (3, 'Running Shoes', 'High-performance running shoes', 'Nike', true, 9.5, 79.99, 'New', false, 'New York', '10001', 'thumbnail_url_1.jpg', 'cover_url_1.jpg', false),
(5, 'Casual Sneakers', 'Comfortable everyday sneakers', 'Adidas', false, 8, 49.99, 'Like New', false, 'Los Angeles', '90001', 'thumbnail_url_2.jpg', 'cover_url_2.jpg', false),
(7, 'Basketball Shoes', 'Premium basketball shoes for sale', 'Jordan', true, 10, 129.99, 'Excellent', false, 'Chicago', '60601', 'thumbnail_url_3.jpg', 'cover_url_3.jpg', false),
(3, 'Hiking Boots', 'Durable boots for outdoor adventures', 'Merrell', false, 11, 89.99, 'Used', true, 'New York', '10001', 'thumbnail_url_4.jpg', 'cover_url_4.jpg', false),
(5, 'Flip Flops', 'Comfortable flip flops for the beach', 'Havaianas', false, 7, 19.99, 'Like New', false, 'Los Angeles', '90001', 'thumbnail_url_5.jpg', 'cover_url_5.jpg', true),
(7, 'Dress Shoes', 'Elegant dress shoes for special occasions', 'Allen Edmonds', false, 9, 149.99, 'Excellent', true, 'Chicago', '60601', 'thumbnail_url_6.jpg', 'cover_url_6.jpg', false),
(3, 'Skate Shoes', 'Stylish skate shoes for skateboarders', 'Vans', true, 8.5, 59.99, 'Used', false, 'New York', '10001', 'thumbnail_url_7.jpg', 'cover_url_7.jpg', false),
(5, 'Winter Boots', 'Insulated boots for cold weather', 'Columbia', false, 10, 109.99, 'New', false, 'Los Angeles', '90001', 'thumbnail_url_8.jpg', 'cover_url_8.jpg', false);
