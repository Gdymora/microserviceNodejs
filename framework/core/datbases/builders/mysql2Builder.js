const mysql = require('mysql2/promise');
const QueryBuilder = require('./AbstractQueryBuilder');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database'
});

class MySql2Builder extends AbstractQueryBuilder {
  constructor(connection) {
    super(connection);
  }

  select(...columns) {
    this.query.select = columns.join(', ');
    return this;
  }

  from(table) {
    this.query.from = table;
    return this;
  }

  where(condition) {
    this.query.where = condition;
    return this;
  }

  andWhere(condition) {
    if (!this.query.where) {
      throw new Error('You must call where() before calling andWhere()');
    }
    this.query.where += ` AND ${condition}`;
    return this;
  }

  orWhere(condition) {
    if (!this.query.where) {
      throw new Error('You must call where() before calling orWhere()');
    }
    this.query.where += ` OR ${condition}`;
    return this;
  }

  orderBy(column, order = 'ASC') {
    this.query.orderBy = `${column} ${order}`;
    return this;
  }

  limit(count) {
    this.query.limit = count;
    return this;
  }

  offset(count) {
    this.query.offset = count;
    return this;
  }

  build() {
    let query = 'SELECT ';
    query += this.query.select ? this.query.select : '*';
    query += ` FROM ${this.query.from}`;
    query += this.query.where ? ` WHERE ${this.query.where}` : '';
    query += this.query.orderBy ? ` ORDER BY ${this.query.orderBy}` : '';
    query += this.query.limit ? ` LIMIT ${this.query.limit}` : '';
    query += this.query.offset ? ` OFFSET ${this.query.offset}` : '';
    return query;
  }
}
exports.module = MySql2Builder;

/* // Usage example
const users = new SelectQueryBuilder(connection)
  .select('id', 'username', 'email')
  .from('users')
  .where('email LIKE "%example.com"')
  .orderBy('username', 'ASC')
  .limit(10)
  .offset(20);

const rows = await users.get();
console.log(rows); */