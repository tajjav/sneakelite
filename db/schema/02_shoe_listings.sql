DROP TABLE IF EXISTS shoe_listings CASCADE;


CREATE TABLE shoe_listings(id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
title VARCHAR(100) NOT NULL,
description TEXT,
brand VARCHAR(50) NOT NULL,
is_featured BOOLEAN NOT NULL DEFAULT FALSE,
size SMALLINT NOT NULL,
price DECIMAL NOT NULL, /* changed the data type from integer to Decimal [Tauqeer]*/
condition VARCHAR(50),
is_sold BOOLEAN NOT NULL DEFAULT FALSE,
city VARCHAR(100) NOT NULL,
postal_code VARCHAR(50) NOT NULL,
thumbnail_url VARCHAR(200) NOT NULL,
cover_url VARCHAR(200) NOT NULL,
is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);
