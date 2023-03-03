const mysql = require('mysql2/promise');

class MySql2ActiveRecord {
  static #connection = null;
  
  static async connect(config) {
    this.#connection = await mysql.createConnection(config);
  }

  static async disconnect() {
    if (this.#connection) {
      await this.#connection.end();
      this.#connection = null;
    }
  }

  static async query(sql, params = []) {
    if (!this.#connection) {
      throw new Error('Connection not established');
    }

    const [rows] = await this.#connection.execute(sql, params);
    return rows;
  }

  static async findOne(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const rows = await this.query(sql, [id]);
    return rows.length ? new this(rows[0]) : null;
  }

  static async find() {
    const sql = `SELECT * FROM ${this.tableName}`;
    const rows = await this.query(sql);
    return rows.map(row => new this(row));
  }

  constructor(attributes = {}) {
    this.attributes = attributes;
  }

  get id() {
    return this.attributes.id;
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }

  async createUpdate() {
    if (this.id) {
      const sql = `UPDATE ${this.constructor.tableName} SET ? WHERE id = ?`;
      await this.constructor.query(sql, [this.attributes, this.id]);
    } else {
      const sql = `INSERT INTO ${this.constructor.tableName} SET ?`;
      const [result] = await this.constructor.query(sql, [this.attributes]);
      this.attributes.id = result.insertId;
    }
  }
  async update() {   
      const sql = `UPDATE ${this.constructor.tableName} SET ? WHERE id = ?`;
      await this.constructor.query(sql, [this.attributes, this.id]);
  }
  async create() {   
      const sql = `INSERT INTO ${this.constructor.tableName} SET ?`;
      const [result] = await this.constructor.query(sql, [this.attributes]);
      this.attributes.id = result.insertId;    
  }
  async delete() {
    const sql = `DELETE FROM ${this.constructor.tableName} WHERE id = ?`;
    await this.constructor.query(sql, [this.id]);
  }
}

/*  */
module.exports = MySql2ActiveRecord;