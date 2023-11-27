const express = require('express');
const router = express.Router();


  // Auth login
  router.post('/login', (req,res) => {
    const {userName} = req.body;
    console.log('userName: ', userName);
    req.session.name = userName;
    res.redirect('/');
  });


  // Login rendering
  router.get('/login/:id', (req,res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  // Auth logout
  router.post('/logout', (req,res) => {
    req.session = null;
    res.redirect('/');
  });

  module.exports = router;