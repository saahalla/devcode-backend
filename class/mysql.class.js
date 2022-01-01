// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
var mysql = require('mysql2/promise')

/* https://www.npmjs.com/package/mysql2#using-promise-wrapper */
class DbMysql {
  constructor() {
    this.connection = null
  }

  async connect() {
    if (this.connection) {
      return this.connection
    } else {
      const pool = await this.createPool()
      return this.connection
    }
  }
  createPool() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
    })

    this.connection = pool
  }
  async query(query) {
    const pool = await this.connect()
    const [row, fields] = await pool.query(query)

    return row
  }
  async queryData(query, data) {
    const pool = await this.connect()
    const [row, fields] = await pool.query(query, data)

    return row
  }
}

module.exports = DbMysql
