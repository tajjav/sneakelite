const db = require('../../connection');

const retrieveFilteredListings = function(options) {
  const sqlParams = [];
 let queryString = `SELECT * FROM shoe_listings WHERE 1 = 1 AND is_sold = FALSE AND is_deleted = FALSE`;
 /*  if (options.brand !=="") {
    sqlParams.push(`%${options.brand}%`);
    queryString += `AND title LIKE $${sqlParams.length}`;
  }
  if (options.size !=="") {
    sqlParams.push(`%${options.size}%`);
    queryString += `AND size = $${sqlParams.length}`;
 }
  */if (options.min_price && options.max_price) {
    sqlParams.push(`${Number(options.min_price)}`);
    sqlParams.push(`${Number(options.max_price)}`);
    queryString += ` AND price >= $${sqlParams.length - 1} AND price <= $${sqlParams.length}`;
  }
 /* if (options.city !=="") {
    sqlParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${sqlParams.length}`;
  }
  if (options.condition !=="") {
    sqlParams.push(`%${options.condition}%`);
    queryString += `AND condition LIKE $${sqlParams.length}`;
  }
 */ queryString += ` ORDER BY price`;
 console.log(queryString);
  return db.query(queryString, sqlParams)
    .then((res) => res.rows);
};

module.exports = {retrieveFilteredListings};
