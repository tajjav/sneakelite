const express = require('express');
const router  = express.Router();
const {favouritesListing, showUserFavourites} = require('../db/queries/2_favourites_queries/01_favourites_queries');

//shoeId is the variable to be used in client scripts at public/scripts/app.js (can be changed later)

// Create Wishlist
router.post('/', (req, res) => {
  console.log(req.body);
  favouritesListing(req.body.shoeId, req.session.user_id)
  .then((shoeListing) => {
    console.log('showListingId: ', req.body.shoeId);
    return res.json(shoeListing);
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
})

// Read all Wishlist     (/api/favourites)
router.get('/', (req, res) => {
  // let templateVars = {};
  showUserFavourites(req.session.user_id)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});








//   .then((result) => {
//     templateVars['favourites'] = result;
//     res.render('favourites', templateVars);
//   })
//   .catch((err) => {
//     console.log('Error: ', err);
//   })
// })

module.exports = router;
