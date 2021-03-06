let __mysql = require('./mysql.class')
let Db = new __mysql()

class Activity {
  async getAll() {
    let data = Db.query(
      'SELECT id, email, title, delete_at FROM activities WHERE delete_at IS NULL',
    )
    return data
  }

  async get(id) {
    let data = Db.query(
      `SELECT id, email, title, delete_at FROM activities WHERE id='${id}' AND delete_at IS NULL LIMIT 1`,
    )
    return data
  }

  async add(data) {
    let insertData = data
    insertData.create_at = new Date().toISOString()
    insertData.update_at = insertData.create_at

    // return insertData
    let query = await Db.queryData(`INSERT INTO activities SET ?`, insertData)

    if (query.affectedRows > 0) {
      let id = query.insertId
      let data = await this.get(id)

      return data[0]
    } else {
      return {}
    }
  }

  async delete(id) {
    let deletedDate = new Date().toISOString()

    let query = await Db.query(
      `UPDATE activities SET delete_at = '${deletedDate}' WHERE id='${id}'`,
    )
    if (query.affectedRows > 0) {
      return true
    } else {
      return false
    }
  }

  async update(id, title) {
    let query = await Db.query(
      `UPDATE activities SET title = '${title}' WHERE id = '${id}'`,
    )
    if (query.affectedRows > 0) {
      let data = await this.get(id)
      return data[0]
    } else {
      return {}
    }
  }
}

module.exports = Activity
