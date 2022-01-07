// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
let mysql = require('mysql2/promise')

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
  async createPool() {
    const pool = await mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
    })

    this.connection = pool
  }
  async query(query) {
    return new Promise(async (resolve, reject) => {
      const pool = await this.connect()
      const [row, fields] = await pool.query(query)

      if (row) {
        resolve(row)
      }
    })
  }
  async queryData(query, data) {
    return new Promise(async (resolve, reject) => {
      const pool = await this.connect()
      const [row, fields] = await pool.query(query, data)
      if (row) {
        resolve(row)
      }
      // return row
    })
  }
}

module.exports = DbMysql
