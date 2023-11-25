const db = require('../../connection');

const listAll = () => {
  return db.query(`
              SELECT * FROM shoe_listings;
            `)
            .then(data => {
              return data.rows;
            }
  );
};

module.exports = { listAll };