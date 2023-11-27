const express = require('express');
const router = express.Router();


module.exports = () => {
  router.get('/login', (req,res) => {
    req.session.user_id = req.params.id;
  })
}