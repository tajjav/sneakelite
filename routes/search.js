const express = require('express');
const router = express.Router();
const {retrieveFilteredListings} = require('../db/queries/4_filtering_queries/01_filtering_queries');

router.get('/', (req, res) => {
  retrieveFilteredListings(req.query)
  .then(shoe_listings => {
    res.json({shoe_listings});
  })
  .catch(err => {
    res.status(404);
    res.json({error: err.message});
  });
});

module.exports = router;
