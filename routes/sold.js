const express = require('express');
const router = express.Router();
const { markAsSold } = require('../db/queries/1_queries_for_listings/06_mark_as_sold');

router.post('/', (req, res) => {
  markAsSold(req.body.shoeListingId, req.session.user_id.id)
  .then(() => {
    res.send('Item has been sold');
  })
  .catch(err => console.log('Error: ', err));
})

module.exports = router;
