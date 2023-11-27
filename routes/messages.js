const express = require('express');
const router  = express.Router();
const {getEmail} = require('../db/queries/5_messaging_queries/01_messaging');

router.post('/', (req, res) => {
  getEmail(req.session.user_id.id)
  .then((data) => {
    res.json(data);
  })
  .catch(err => console.log("Error: ", err));
});

router.get('/', (req, res) => {
  const templateVars = {};
});

router.post('/:userId', (req, res) => {
  getEmail(req.params/userId)
  .then((result) => {
    const templateVars = {result};
    res.render('result', templateVars);
  })
})

module.exports = router;
