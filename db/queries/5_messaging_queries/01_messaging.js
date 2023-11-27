const db = require('../../connection');

const getEmail = (userId) => {
  return db
  .query(`SELECT email from users WHERE id = $1;`, [userId])

.then((result) => {
  return result.rows[0].email;
 })
.catch((err) => {
  console.log('error: ', err);
})
}

module.exports = {getEmail};
