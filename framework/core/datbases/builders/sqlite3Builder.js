const sqlite3 = require('sqlite3').verbose();

class SqLite3Builder {
  constructor() {
    this.db = new sqlite3.Database('./database.sqlite');
    this.query = {
      select: '*',
      from: '',
      where: [],
      orderBy: '',
      limit: '',
    };
  }

  select(columns) {
    this.query.select = Array.isArray(columns) ? columns.join(', ') : columns;
    return this;
  }

  from(table) {
    this.query.from = table;
    return this;
  }

  where(column, value) {
    if (value !== undefined) {
      this.query.where.push(`${column} = ?`);
      return this.param(value);
    } else {
      this.query.where.push(column);
      return this;
    }
  }

  andWhere(column, value) {
    if (value !== undefined) {
      this.query.where.push(`AND ${column} = ?`);
      return this.param(value);
    } else {
      this.query.where.push(`AND ${column}`);
      return this;
    }
  }

  orderBy(column, direction) {
    this.query.orderBy = `${column} ${direction || 'ASC'}`;
    return this;
  }

  limit(limit) {
    this.query.limit = limit;
    return this;
  }

  param(value) {
    this.params = this.params || [];
    this.params.push(value);
    return this;
  }

  async execute() {
    const whereClause = this.query.where.length > 0 ? `WHERE ${this.query.where.join(' ')}` : '';
    const orderByClause = this.query.orderBy ? `ORDER BY ${this.query.orderBy}` : '';
    const limitClause = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    const sql = `SELECT ${this.query.select} FROM ${this.query.from} ${whereClause} ${orderByClause} ${limitClause}`;
    const rows = await new Promise((resolve, reject) => {
      this.db.all(sql, this.params || [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    return rows;
  }
}
module.exports = SqLite3Builder;
// Example usage:
/* const queryBuilder = new SqLite3Builder();

queryBuilder.select(['id', 'name'])
  .from('users')
  .where('name', 'John')
  .andWhere('age > ?', 21)
  .orderBy('id', 'DESC')
  .limit(10)
  .execute()
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  }); */