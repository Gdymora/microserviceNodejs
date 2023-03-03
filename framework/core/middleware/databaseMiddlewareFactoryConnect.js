const sqlite3 = require("sqlite3");
const mysql = require("mysql2/promise");
const { Pool } = require("pg");
const { MongoClient } = require("mongodb");
class DatabaseMiddlewareFactoryConnect {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.dbType = dbConfig.type || "sqlite3";
  }

  connect() {
    switch (this.dbType) {
      case "sqlite3":
        this.db = new sqlite3.Database(this.dbConfig.filename);
        break;
      case "mysql":
        this.db = mysql.createConnection({
          host: this.dbConfig.host,
          user: this.dbConfig.user,
          password: this.dbConfig.password,
          database: this.dbConfig.database,
        });
        break;
      case "postgresql":
        this.db = new Pool({
          host: this.dbConfig.host,
          user: this.dbConfig.user,
          password: this.dbConfig.password,
          database: this.dbConfig.database,
          port: this.dbConfig.port || 5432,
        });
        break;
      case "mongodb":
        const client = new MongoClient(this.dbConfig.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        client.connect();
        this.db = client.db(this.dbConfig.database);
        break;
      default:
        throw new Error(`Unknown database type: ${this.dbType}`);
    }
    return (req, res, next) => {
      try {
        req.db = this.db;
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

module.exports = DatabaseMiddlewareFactoryConnect;
