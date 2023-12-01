const db = require('../../connection');

const getEmail = (userId) => {
  return db
  .query(`SELECT email from users WHERE id = $1;`, [userId])

.then((result) => {
  return result.rows[0].email;
 })
.catch((err) => {
  console.log('error: ', err);
})
}

const messages = (single_shoe_listing) => {
  const queryString = `
    INSERT INTO shoe_listings (
      title,
      description,
      brand,
      is_featured,
      size,
      price,
      condition,
      is_sold,
      user_id,
      city,
      postal_code,
      thumbnail_url,
      cover_url,
      is_deleted
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  `;

  const queryParams = [
    single_shoe_listing.title,
    single_shoe_listing.description,
    single_shoe_listing.brand,
    single_shoe_listing.is_featured,
    single_shoe_listing.size,
    single_shoe_listing.price,
    single_shoe_listing.condition,
    single_shoe_listing.is_sold,
    single_shoe_listing.user_id,
    single_shoe_listing.city,
    single_shoe_listing.postal_code,
    single_shoe_listing.thumbnail_url,
    single_shoe_listing.cover_url,
    single_shoe_listing.is_deleted,
  ];
console.log(queryParams);
  return db.query(queryString, queryParams).then((data) => {
    return data.rows[0];
  });
};







module.exports = {getEmail};

