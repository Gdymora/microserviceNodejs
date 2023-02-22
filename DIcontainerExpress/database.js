const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mydatabase.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  } else {
    console.log('Connected to the database.');
  }
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  query,
};
