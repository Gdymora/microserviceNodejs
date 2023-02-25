const sqlite3 = require('sqlite3').verbose();

class SqLite3ActiveRecord {
  constructor(tableName, schema) {
    this.db = new sqlite3.Database('./database.sqlite');
    this.tableName = tableName;
    this.schema = schema;
    this.fields = Object.keys(schema);
  }

  async create(params) {
    const values = this._sanitize(params);

    const placeholders = values.map(() => '?').join(',');
    const sql = `INSERT INTO ${this.tableName} (${this.fields.join(', ')}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
      this.db.run(sql, values, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  async update(id, params) {
    const values = this._sanitize(params);
    const setClause = this.fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.run(sql, [...values, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.db.run(sql, id, function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  async findOne(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, id, function (err, row) {
        if (err) reject(err);
        else if (!row) resolve(null);
        else resolve(row);
      });
    });
  }

  async find(params) {
    const whereClause = this._buildWhereClause(params);
    const sql = `SELECT * FROM ${this.tableName} ${whereClause}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  _sanitize(params) {
    const values = [];
    for (const field of this.fields) {
      const value = params[field];
      if (value !== undefined) {
        values.push(value);
      } else {
        values.push(null);
      }
    }
    return values;
  }

  _buildWhereClause(params) {
    const clauses = [];
    const values = [];
    for (const field of Object.keys(params)) {
      const value = params[field];
      if (value !== undefined) {
        clauses.push(`${field} = ?`);
        values.push(value);
      }
    }
    return clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
  }
}

// Example usage:
const userSchema = {
  id: 'INTEGER PRIMARY KEY',
  name: 'TEXT',
  age: 'INTEGER',
};
exports.module = SqLite3ActiveRecord
/* const User = new SqLite3ActiveRecord('users', userSchema);

User.create({ name: 'John', age: 25 })
  .then(id => {
    console.log(`Created user with ID ${id}`);
  })
  .catch(error => {
    console.error(error);
  });

User.update(1, { age: 26 })
  .then(numUpdated => {
    */