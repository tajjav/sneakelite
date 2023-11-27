const express = require('express');
const router  = express.Router();
const {favouritesListing, showUserFavourites} = require('../db/queries/2_favourites_queries/01_favourites_queries');

//shoeId is the variable to be used in client scripts at public/scripts/app.js (can be changed later)
router.post('/', (req, res) => {
  favouritesListing(req.body.shoeId, req.session.user_id.id)
  .then((shoeListing) => {
    console.log('showListingId: ', req.body.shoeId);
    return res.json(shoeListing);
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
})

router.get('/', (req, res) => {
  let templateVars = {};
  showUserFavourites(req.session.user_id.id)
  .then((result) => {
    templateVars['favourites'] = result;
    res.render('favourites', templateVars);
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
})

module.exports = router;
