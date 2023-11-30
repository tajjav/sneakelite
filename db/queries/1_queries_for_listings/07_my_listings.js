const db = require('../../connection');

/**
 * myListings function definition
 * @param {Number} user_id A users id for whom, all shoe_listings are required
 * @returns {Promise<{}>} A promise of the shoe_listings.
 */
const myListings = (user_id) => {
  const queryString = `
  SELECT DISTINCT shoe_listings.id,
                  shoe_listings.user_id,
                  title,
                  description,
                  brand,
                  is_featured,
                  size,
                  price,
                  condition,
                  is_sold,
                  city,
                  postal_code,
                  thumbnail_url,
                  cover_url,
                  is_deleted
  FROM shoe_listings
  WHERE user_id = $1;
  `;
  const queryParams = [`${user_id}`];
  return db.query(queryString,queryParams)
            .then(data => {
              return data.rows;
            }
  );
};

module.exports = { myListings };