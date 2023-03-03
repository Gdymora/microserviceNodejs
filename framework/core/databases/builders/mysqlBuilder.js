const mysql = require('mysql');

class MySqlBuilder {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'username',
      password: 'password',
      database: 'database_name'
    });
  }

  select(table, columns) {
    const columnString = columns ? columns.join(', ') : '*';
    this.query = `SELECT ${columnString} FROM ${table}`;
    return this;
  }

  where(column, value) {
    if (!this.query.includes('WHERE')) {
      this.query += ' WHERE';
    } else {
      this.query += ' AND';
    }
    this.query += ` ${column} = ${this.connection.escape(value)}`;
    return this;
  }

  limit(limit) {
    this.query += ` LIMIT ${limit}`;
    return this;
  }

  orderBy(column, direction) {
    this.query += ` ORDER BY ${column} ${direction || 'ASC'}`;
    return this;
  }

  execute(callback) {
    this.connection.query(this.query, (error, results, fields) => {
      if (error) throw error;
      callback(results);
    });
  }
}
module.exports = MySqlBuilder;
// Example usage:
/* const queryBuilder = new MySqlBuilder();

queryBuilder.select('users', ['id', 'name']).where('name', 'John').limit(10).orderBy('id', 'DESC').execute((results) => {
  console.log(results);
}); */