const sqlite3 = require('sqlite3').verbose();

class DatabaseBuilder {
  constructor(dbFilePath) {
    this.dbFilePath = dbFilePath;
    this.db = null;
  }

  open() {
    this.db = new sqlite3.Database(this.dbFilePath);
    return this;
  }

  configure() {
    // Add any database configuration here
    return this;
  }

  build() {
    return this.db;
  }
}

function query(sql, params) {
  const db = new DatabaseBuilder('../mydatabase.sqlite3')
    .open()
    .configure()
    .build();
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
