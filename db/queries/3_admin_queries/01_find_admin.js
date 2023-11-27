const db = require('../../connection');

const findAdmin = (id) => {
  return db
  .query(`SELECT * from users WHERE id = $1;`, [id])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error: ', err);
  })
}

module.exports = {findAdmin};
