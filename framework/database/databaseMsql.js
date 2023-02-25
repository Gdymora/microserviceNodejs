const squel = require('squel').useFlavour('mysql');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
});

async function query(sql, params) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(squel.sql(sql, ...params).toString());
    return result[0];
  } finally {
    conn.release();
  }
}

module.exports = {
  query,
};
