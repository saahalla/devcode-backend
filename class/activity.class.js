let __mysql = require('./mysql.class')
let Db = new __mysql()

class Activity {
  getAll() {
    let data = Db.query('SELECT * FROM activities WHERE delete_at IS NULL')
    return data
  }

  get(id) {
    let data = Db.query(
      `SELECT * FROM activities WHERE id='${id}' AND delete_at IS NULL`,
    )
    return data
  }

  async add(data) {
    let insertData = data
    insertData.create_at = new Date().toISOString()
    insertData.update_at = insertData.create_at

    // return insertData
    let query = await Db.queryData(`INSERT INTO activities SET ?`, insertData)

    console.log(query)
    if (query.affectedRows > 0) {
      let id = query.insertId
      let data = await this.get(id)
      console.log('data', data[0])

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
