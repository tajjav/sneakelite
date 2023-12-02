const express = require('express');
const router  = express.Router();
const {getEmail} = require('../db/queries/5_messaging_queries/01_messaging');
const db = require('../db/connection');

router.post('/', (req, res) => {
  getEmail(req.session.user_id)
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


// message rendering handler          (/messages)
// router.get('/', (req,res) => {
//   // const user_id = req.session.user_id;
//   // if (!user_id) return res.send("Unauthorized, log in first");
//   // Promise.all([
//   //   db.query(`SELECT * from messages WHERE sender_id = $1 ORDER BY timestamp;` , [user_id]),
//   //   db.query(`SELECT * from messages WHERE receiver_id = $1 ORDER BY timestamp; `, [user_id]),
//   //   db.query(`SELECT * from users WHERE users.id = $1;`, [user_id])
//   // ])
//   //   .then(([sent, received, data]) => {
//   //     const allmessages =[...sent.rows,...received.rows]
//   //     const userName = data.rows[0].name;
//       res.render("messages-tj") //, { messages: allmessages, userName, user_id });
      
//       // res.json(data.rows)
//     })
//     // .catch((err) => {
//     //   console.log(err);
//     //   res.send("error getting messages");
//     // });
// // })


module.exports = router;
