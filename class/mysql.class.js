// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
var mysql = require('mysql2/promise')

/* https://www.npmjs.com/package/mysql2#using-promise-wrapper */
class DbMysql {
  constructor() {
    this.connection = null
  }

  async connect() {
    if (this.connection) {
      // console.log('already connect')
      return this.connection
    } else {
      // console.log('create new pool')
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
    // console.log("pool", pool)
    this.connection = pool
    // return pool
  }
  async query(query) {
    const pool = await this.connect()
    const [row, fields] = await pool.query(query)
    // console.log({ query })
    // pool.end()
    return row
  }
  async queryData(query, data) {
    // console.log({ query, data })
    const pool = await this.connect()
    const [row, fields] = await pool.query(query, data)
    // pool.end()
    return row
  }
}

module.exports = DbMysql
