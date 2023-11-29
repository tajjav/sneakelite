/*
 * All routes for Listing Data are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /api/listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const listingQueries01 = require('../db/queries/1_queries_for_listings/01_add_shoe_listing');
const listingQueries02 = require('../db/queries/1_queries_for_listings/02_list_all_shoes');
const listingQueries03= require('../db/queries/1_queries_for_listings/03_list_one_shoe');
const listingQueries04 = require('../db/queries/1_queries_for_listings/04_update_single_shoe_listing');
const listingQueries05 = require('../db/queries/1_queries_for_listings/05_delete_shoe_listing');


// Create listing    (/api/listings/)
router.post('/', (req, res) => {
  const { newListing } = req.body;
  listingQueries01.addToList(newListing)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Read all listings      (/api/listings/)
router.get('/', (req, res) => {
  listingQueries02.listAll()
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Read one listing    (/api/listings/:id)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  listingQueries03.listOne(id)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Edit listing     (/api/listings/:id)
router.post('/:id', (req, res) => {
  const {shoe_listing_id } = req.params;
  const { updateListing } = req.body;
  listingQueries04.updateListItem(updateListing,shoe_listing_id)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Delete listing     (/api/listings/:id/delete)
router.post('/:id/delete', (req, res) => {
  const {shoe_listing_id } = req.params;
  listingQueries05.deleteListItem(shoe_listing_id)
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;