const { Pool } = require('pg');

class QueryBuilder {
  constructor() {
    this.pool = new Pool({
      user: 'your_username',
      host: 'your_host',
      database: 'your_database',
      password: 'your_password',
      port: 5432,
    });
  }

  async select(table, columns = '*', where = {}) {
    let whereClause = '';
    let values = [];

    if (Object.keys(where).length > 0) {
      const whereConditions = Object.keys(where)
        .map((key, index) => {
          values.push(where[key]);
          return `${key} = $${index + 1}`;
        })
        .join(' AND ');

      whereClause = `WHERE ${whereConditions}`;
    }

    const query = {
      text: `SELECT ${columns} FROM ${table} ${whereClause}`,
      values: values,
    };

    const client = await this.pool.connect();

    try {
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.join(',');
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(',');

    const query = {
      text: `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
      values: values,
    };

    const client = await this.pool.connect();

    try {
      const result = await client.query(query);
      return result.rowCount;
    } finally {
      client.release();
    }
  }

  async update(table, data, where = {}) {
    let whereClause = '';
    let values = [];

    if (Object.keys(where).length > 0) {
      const whereConditions = Object.keys(where)
        .map((key, index) => {
          values.push(where[key]);
          return `${key} = $${index + 1}`;
        })
        .join(' AND ');

      whereClause = `WHERE ${whereConditions}`;
    }

    const setClause = Object.keys(data)
      .map((key, index) => {
        values.push(data[key]);
        return `${key} = $${Object.keys(where).length + index + 1}`;
      })
      .join(',');

    const query = {
      text: `UPDATE ${table} SET ${setClause} ${whereClause}`,
      values: values,
    };

    const client = await this.pool.connect();

    try {
      const result = await client.query(query);
      return result.rowCount;
    } finally {
      client.release();
    }
  }

  async delete(table, where = {}) {
    let whereClause = '';
    let values = [];

    if (Object.keys(where).length > 0) {
      const whereConditions = Object.keys(where)
        .map((key, index) => {
          values.push(where[key]);
          return `${key} = $${index + 1}`;
        })
        .join(' AND ');

      whereClause = `WHERE ${whereConditions}`;
    }

    const query = {
      text: `DELETE FROM ${table} ${whereClause}`,
      values: values,
    };

    const client = await this.pool.connect();

    try {
      const result = await client.query(query);
      return result.rowCount;
    } finally {
      client.release();
    }
  }
}

module.exports = QueryBuilder;