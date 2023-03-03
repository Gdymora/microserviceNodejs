const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbFilePath = path.join(__dirname, "../../../mydatabase.sqlite3");
const express = require("express");
const app = express();
class UserRepository { 
  initConnect = false;
  constructor() { 

    if (this.initConnect) {   
      
    } else {
      this.db = new sqlite3.Database(dbFilePath);
      
    }
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

  getAll(db) { 
     const sql = "SELECT * FROM users";
      return new Promise((resolve, reject) => {
         db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });   

  }

  getById(db, id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  create(db, user) {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [user.name, user.email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  update(db, id, user) {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(sql, [user.name, user.email, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  delete(db, id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  close(db) {
     db.close();
  }
}

module.exports = UserRepository;
/* module.exports = () => {
  return new UserRepository();
}; */
