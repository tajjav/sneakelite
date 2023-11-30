const db = require('../../connection');

/**
 * deleteListItem function definition
 * @param {Number} shoe_listing_id An id of a single shoe listing which should be deleted.
 * @returns {Promise<{}>} A promise to the listing.
 */
const deleteListItem = (shoe_listing_id) => {
  const queryString = `
    DELETE FROM shoe_listings
    WHERE shoe_listings.id = $1;
  `;
  const queryParams = [`${shoe_listing_id}`];
  return db.query(queryString,queryParams)
            .then(() => {
             console.log("listing is deleted successfully");
            }
  );
};

module.exports = { deleteListItem };