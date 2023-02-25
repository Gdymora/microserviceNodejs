class AbstaracQueryBuilder {
  constructor(connection) {
    if (new.target === QueryBuilder) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    this.connection = connection;
    this.query = {};
  }

  select(...columns) {
    throw new Error('Method not implemented');
  }

  from(table) {
    throw new Error('Method not implemented');
  }

  where(condition) {
    throw new Error('Method not implemented');
  }

  andWhere(condition) {
    throw new Error('Method not implemented');
  }

  orWhere(condition) {
    throw new Error('Method not implemented');
  }

  orderBy(column, order = 'ASC') {
    throw new Error('Method not implemented');
  }

  limit(count) {
    throw new Error('Method not implemented');
  }

  offset(count) {
    throw new Error('Method not implemented');
  }

  async get() {
    try {
      const [rows, fields] = await this.connection.promise().query(this.build());
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }

  build() {
    throw new Error('Method not implemented');
  }
}

module.exports = AbstaracQueryBuilder; 
