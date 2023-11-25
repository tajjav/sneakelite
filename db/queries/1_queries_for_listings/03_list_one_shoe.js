const db = require('../../connection');

const listOne = (shoe_listing_id) => {
  const queryString = `
    SELECT * FROM shoe_listings
    WHERE id = $1;
  `;
  const queryParams = [`${shoe_listing_id}`];
  return db.query(queryString,queryParams)
            .then(data => {
              return data.rows;
            }
  );
};

module.exports = { listOne };