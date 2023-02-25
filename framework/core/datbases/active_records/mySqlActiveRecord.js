const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect();

class MySqlActiveRecord {
  constructor(attributes) {
    this.attributes = attributes;
  }

  create() {
    const query = `INSERT INTO ${this.constructor.tableName} SET ?`;

    connection.query(query, this.attributes, (error, results, fields) => {
      if (error) throw error;
      this.attributes.id = results.insertId;
    });
  }

  update() {
    const query = `UPDATE ${this.constructor.tableName} SET ? WHERE id = ?`;

    connection.query(query, [this.attributes, this.attributes.id], (error, results, fields) => {
      if (error) throw error;
    });
  }

  delete() {
    const query = `DELETE FROM ${this.constructor.tableName} WHERE id = ?`;

    connection.query(query, [this.attributes.id], (error, results, fields) => {
      if (error) throw error;
    });
  }

  static find(callback) {
    const query = `SELECT * FROM ${this.tableName}`;

    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      const objects = results.map(attributes => new this(attributes));
      callback(objects);
    });
  }

  static findOne(id, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;

    connection.query(query, [id], (error, results, fields) => {
      if (error) throw error;
      if (results.length === 0) {
        callback(null);
      } else {
        const attributes = results[0];
        const object = new this(attributes);
        callback(object);
      }
    });
  }
}
exports.module = MySqlActiveRecord
/* class User extends ActiveRecord {
  static get tableName() {
    return 'users';
  }

  get firstName() {
    return this.attributes.firstName;
  }

  set firstName(value) {
    this.attributes.firstName = value;
  }

  get lastName() {
    return this.attributes.lastName;
  }

  set lastName(value) {
    this.attributes.lastName = value;
  }

  get email() {
    return this.attributes.email;
  }

  set email(value) {
    this.attributes.email = value;
  }

  get password() {
    return this.attributes.password;
  }

  set password(value) {
    this.attributes.password = value;
  }
}

// Example usage:
const user = new User({
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: 'password'
});

user.save();
user.firstName = 'Jane';
user.update();
User.all((users) => console.log(users));
User.find(user.id, (foundUser) => console.log(foundUser));
user.delete(); */