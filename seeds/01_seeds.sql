INSERT INTO users (email, password, name, is_admin)
VALUES ('tomadams8@gmail.com', '1A2A3R', 'Tom Adams', FALSE),
('whitecat123@gmail.com', '6IsmbaHv6dVZfOh', 'Wilhelm Mladen', FALSE),
('gefuv-ebumo38@hotmail.com', '8#.]b}!@W7u3', 'Rashad Hieronymos', TRUE),
('powafa-zane58@yahoo.com', '973<@>Q]x5!', 'Thancrat Nedyalka', FALSE),
('xuwapis-ili56@outlook.com', 'V>6}t46MV\$e', 'Boris Isaak', TRUE),
('wazotu_putu78@gmail.com', 'mpRgrJ"96-6~', 'Mykola Carlyn', FALSE),
('pebo_gabico21@gmail.com', 'nuY45(7£8rQB', 'Milica Anastasiya', TRUE),
('taxicof_ire57@hotmail.com', 'yu3k$_P8QH"3', 'Khava Raginaharjaz', FALSE);

INSERT INTO shoe_listings(user_id, title, description, brand, is_featured, size, price, condition, is_sold, city, postal_code, thumbnail_url, cover_url, is_deleted)
VALUES (3, 'Running Shoes', 'High-performance running shoes', 'Nike', true, 9.5, 79.99, 'New', false, 'New York', '10001', 'thumbnail_url_1.jpg', 'cover_url_1.jpg', false),
(5, 'Casual Sneakers', 'Comfortable everyday sneakers', 'Adidas', false, 8, 49.99, 'Like New', false, 'Los Angeles', '90001', 'thumbnail_url_2.jpg', 'cover_url_2.jpg', false),
(7, 'Basketball Shoes', 'Premium basketball shoes for sale', 'Jordan', true, 10, 129.99, 'Excellent', false, 'Chicago', '60601', 'thumbnail_url_3.jpg', 'cover_url_3.jpg', false),
(3, 'Hiking Boots', 'Durable boots for outdoor adventures', 'Merrell', false, 11, 89.99, 'Used', true, 'New York', '10001', 'thumbnail_url_4.jpg', 'cover_url_4.jpg', false),
(5, 'Flip Flops', 'Comfortable flip flops for the beach', 'Havaianas', false, 7, 19.99, 'Like New', false, 'Los Angeles', '90001', 'thumbnail_url_5.jpg', 'cover_url_5.jpg', true),
(7, 'Dress Shoes', 'Elegant dress shoes for special occasions', 'Allen Edmonds', false, 9, 149.99, 'Excellent', true, 'Chicago', '60601', 'thumbnail_url_6.jpg', 'cover_url_6.jpg', false),
(3, 'Skate Shoes', 'Stylish skate shoes for skateboarders', 'Vans', true, 8.5, 59.99, 'Used', false, 'New York', '10001', 'thumbnail_url_7.jpg', 'cover_url_7.jpg', false),
(5, 'Winter Boots', 'Insulated boots for cold weather', 'Columbia', false, 10, 109.99, 'New', false, 'Los Angeles', '90001', 'thumbnail_url_8.jpg', 'cover_url_8.jpg', false);

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


