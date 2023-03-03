const MysqlBuilder = require('../builder/mysqlBuilder');
const Mysql2Builder = require('../builder/mysql2Builder');
const Sqlite3Builder = require('../builder/sqlite3Builder');
const PostgresBuilder = require('../builder/postgresBuilder');
class DatabaseBuilderFactory {
  typeDB = ['mysql', 'mysql2', 'sqlite3', 'postgres'];

  createBuilder(type) {
    if (!typeDB.include(type)) {
      throw new Error(`Invalid database type: ${type}`);
    }

    switch (type) {
      case 'mysql':
        return new MysqlBuilder();
      case 'mysql2':
        return new Mysql2Builder();
      case 'sqlite3':
        return new Sqlite3Builder();
      case 'postgres':
        return new PostgresBuilder();
      default:
        throw new Error(`Invalid database type: ${type}`);
    }
  }
}

module.exports = DatabaseBuilderFactory;
