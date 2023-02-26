const sqlite3 = require('sqlite3').verbose();
const dbFilePath = '../../mydatabase.sqlite3';

class UserRepository {
  constructor() {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable();
   // this.insertTable();
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `;
    this.db.run(sql);
  }
  insertTable() {
    const sql = `INSERT INTO users (name, email) VALUES ('Jon Dou', 'jonDou@mail.com')`;
    this.db.run(sql);
  }

  getAll() {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  create(user) {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      this.db.run(sql, [user.name, user.email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  update(id, user) {
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(sql, [user.name, user.email, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = UserRepository;
/* module.exports = () => {
  return new UserRepository();
}; */
