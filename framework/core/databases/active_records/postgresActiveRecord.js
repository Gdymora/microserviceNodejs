const { Pool } = require('pg');

// Define the database connection settings
const pool = new Pool({
  user: 'db_user',
  host: 'localhost',
  database: 'db_name',
  password: 'db_password',
  port: 5432,
});

class PostgresActiveRecord {
  // Define the constructor method with a table name
  constructor(tableName) {
    this.tableName = tableName;
  }

  // Define the find method to retrieve a record by ID
  async findOne(id) {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  // Define the all method to retrieve all records
  async find() {
    const query = {
      text: `SELECT * FROM ${this.tableName}`,
    };
    const { rows } = await pool.query(query);
    return rows;
  }

  // Define the create method to insert a new record
  async create(data) {
    const keys = Object.keys(data).join(',');
    const values = Object.values(data);
    const placeholders = values.map((value, index) => `$${index + 1}`).join(',');
    const query = {
      text: `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`,
      values,
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  // Define the update method to update a record by ID
  async update(id, data) {
    const set = Object.entries(data).map(([key, value]) => `${key} = $${value}`).join(',');
    const query = {
      text: `UPDATE ${this.tableName} SET ${set} WHERE id = $${Object.values(data).length + 1} RETURNING *`,
      values: [...Object.values(data), id],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  // Define the delete method to delete a record by ID
  async delete(id) {
    const query = {
      text: `DELETE FROM ${this.tableName} WHERE id = $1`,
      values: [id],
    };
    await pool.query(query);
    return true;
  }
}

module.exports = PostgresActiveRecord;
/* const User = new PostgresActiveRecord('users');

// Find a user by ID
const user = await User.find(1);

// Retrieve all users
const users = await User.all();

// Create a new user
const newUser = await User.create({ name: 'John Doe', email: 'johndoe@example.com' });

// Update a user by ID
const updatedUser = await User.update(1, { name: 'Jane Doe', email: 'janedoe@example.com' });

// Delete a user by ID
const deleted = await User.delete(1); */