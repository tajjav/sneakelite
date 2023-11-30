const db = require('../../connection');

const markAsSold = (shoeListingId, userId) => {
  return db
    .query(`UPDATE shoe_listings
    SET is_sold = TRUE
    WHERE shoe_listings.id = $1
    AND shoe_listings.user_id = $2;`, [shoeListingId, userId])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log('Error:', err);
    })
}

module.exports = {markAsSold};
