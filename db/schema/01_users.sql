-- created by tauqeer

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shoe_listings CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(500) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE shoe_listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  brand VARCHAR(255) NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  gender VARCHAR(255) NOT NULL DEFAULT 'male',
  size DECIMAL NOT NULL,
  price INTEGER NOT NULL,
  condition VARCHAR(255) NOT NULL DEFAULT 'new',
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  city VARCHAR(255),
  postal_code VARCHAR(255),
  thumbnail_url VARCHAR(500),
  cover_url VARCHAR(500),
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  shoe_listing_id INTEGER REFERENCES shoe_listings(id) ON DELETE CASCADE
);