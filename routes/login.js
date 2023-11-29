const express = require('express');
const router = express.Router();
const db = require("../db/connection");


  // Auth login
  router.post('/login', (req,res) => {
    const {userName} = req.body;
    console.log('userName: ', userName);
    db.query("SELECT * FROM users WHERE name = $1", [userName])
    .then((data) => {
    req.session.user_id = data.rows[0].id;
    res.redirect('/');
    })
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