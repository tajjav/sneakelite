DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages(id SERIAL PRIMARY KEY NOT NULL,
shoe_listings_id INTEGER REFERENCES shoe_listings(id) ON DELETE CASCADE NOT NULL,
sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
content TEXT NOT NULL,
timestamp TIMESTAMP NOT NULL);