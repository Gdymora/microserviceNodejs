const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbFilePath = path.join(__dirname, "../../../mydatabase.sqlite3");
const express = require("express");
const app = express();
class PostRepository { 
  initConnect = false;
  constructor() { 

    if (this.initConnect) {   
      
    } else {
      this.db = new sqlite3.Database(dbFilePath);
      
    }
  }

  getAll(db) { 
     const sql = "SELECT * FROM posts";
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
    const sql = "SELECT * FROM posts WHERE id = ?";
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

  create(db, post) {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [post.name, post.email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  update(db, id, post) {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(sql, [post.name, post.email, id], function (err) {
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

module.exports = PostRepository;
/* module.exports = () => {
  return new PostRepository();
}; */
