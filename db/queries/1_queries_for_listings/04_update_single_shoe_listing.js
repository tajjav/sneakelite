const db = require('../../connection');

/**
 * updateListItem function definition
 * @param {Object} update_single_shoe_listing An object containing all the details of a single shoe listing
 * @returns {Promise<{}>} A promise to the listing.
 */
const updateListItem = (update_single_shoe_listing, shoe_listing_id) => {
  const queryString = `
    UPDATE shoe_listings
    SET title = $1,
        description = $2,
        brand = $3,
        is_featured = $4,
        size = $6,
        price = $7,
        condition = $8,
        is_sold = $9,
        user_id = $10,
        city = $11,
        postal_code = $12,
        thumbnail_url = $13,
        cover_url = $14,
        is_deleted = $15
    WHERE shoe_listing_id = $16
  `;
  const queryParams = [
                        `${update_single_shoe_listing.title}`,
                        `${update_single_shoe_listing.description}`,
                        `${update_single_shoe_listing.brand}`,
                        `${update_single_shoe_listing.is_featured}`,
                        `${update_single_shoe_listing.size}`,
                        `${update_single_shoe_listing.price}`,
                        `${update_single_shoe_listing.condition}`,
                        `${update_single_shoe_listing.is_sold}`,
                        `${update_single_shoe_listing.user_id}`,
                        `${update_single_shoe_listing.city}`,
                        `${update_single_shoe_listing.postal_code}`,
                        `${update_single_shoe_listing.thumbnail_url}`,
                        `${update_single_shoe_listing.cover_url}`,
                        `${update_single_shoe_listing.is_deleted}`,
                        `${shoe_listing_id}`
  ];
  return db.query(queryString,queryParams)
            .then(data => {
              return data.rows[0];
            }
  );
};

module.exports = { updateListItem };