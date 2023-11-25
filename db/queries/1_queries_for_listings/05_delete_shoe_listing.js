const db = require('../../connection');

/**
 * updateListItem function definition
 * @param {Object} update_single_shoe_listing An object containing all the details of a single shoe listing
 * @returns {Promise<{}>} A promise to the listing.
 */
const deleteListItem = (shoe_listing_id) => {
  const queryString = `
    DELETE FROM shoe_listings
    WHERE shoe_listing_id = $1;
  `;
  const queryParams = [`${shoe_listing_id}`];
  return db.query(queryString,queryParams)
            .then(data => {
              return data.rows;
            }
  );
};

module.exports = { deleteListItem };