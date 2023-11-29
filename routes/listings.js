const express = require('express');
const router  = express.Router();



router.get('/item-details', (req, res) => {
  res.render('itemdes');
});



module.exports = router;
