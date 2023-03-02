require('dotenv').config();
module.exports = {

    development: {
      client: process.env.KNEX_CLIENT,
      connection: process.env.KNEX_CONNECTION_STRING,
      migrations: {
        directory: __dirname + '/migrations'
      }
    }
  
  };