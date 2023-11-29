const db = require('../../connection');

const favouritesListing = function(favShoe, user_id) {
  return db
    .query(`INSERT INTO favourites(user_id, shoe_listings_id) VALUES ($1, $2) RETURNING *;`,
    [user_id, favShoe])
    .then((result) => {
      console.log('result: ', result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log('error: ', err);
    })
}

// i don't know how to utilize favourites on the frontend. I need shoe_listings, filtered based on favourites [Tauqeer]
// const showUserFavourites = function (user_id) {
//   return db
//     .query(`SELECT * from favourites
//     JOIN shoe_listings ON shoe_listings.id = favourites.shoe_listings_id
//     WHERE user_id = $1`, [user_id])
//     .then((result) => {
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log('error: ', err);
//     })
// }

const showUserFavourites = function (user_id) {
  return db
    .query(`SELECT DISTINCT shoe_listings.id,
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
      JOIN favourites ON shoe_listings.id = favourites.shoe_listings_id
      JOIN users ON users.id = shoe_listings.user_id
      GROUP BY shoe_listings_id, shoe_listings.id, favourites.user_id
      HAVING favourites.user_id = $1`, [user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('error: ', err);
    })
}

module.exports = {favouritesListing, showUserFavourites};
