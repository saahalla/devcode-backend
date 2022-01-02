let __mysql = require('./mysql.class')
let Db = new __mysql()
let __activity = require('./activity.class')
let Activity = new __activity()

class Todo {
  async getAll(activity_group_id = null) {
    let data = []
    if (activity_group_id) {
      data = Db.query(
        `SELECT * FROM todos WHERE delete_at IS NULL AND activity_group_id = '${activity_group_id}'`,
      )
    } else {
      data = Db.query('SELECT * FROM todos WHERE delete_at IS NULL')
    }
    return data
  }

  async get(id) {
    let data = Db.query(
      `SELECT * FROM todos WHERE id='${id}' AND delete_at IS NULL`,
    )
    return data
  }

  async add(data) {
    let activity = await Activity.get(data.activity_group_id)
    if (activity.length > 0) {
      let insertData = data
      insertData.create_at = new Date().toISOString()
      insertData.update_at = insertData.create_at

      let query = await Db.queryData(`INSERT INTO todos SET ?`, insertData)

      if (query.affectedRows > 0) {
        let id = query.insertId
        let data = await this.get(id)

        return data[0]
      } else {
        return {}
      }
    } else {
      return false
    }
  }

  async delete(id) {
    let deletedDate = new Date().toISOString()

    let query = await Db.query(
      `UPDATE todos SET delete_at = '${deletedDate}' WHERE id='${id}'`,
    )
    if (query.affectedRows > 0) {
      return true
    } else {
      return false
    }
  }

  async update(id, title = null, is_active = null) {
    let dbquery = ''
    if (title !== null && title !== undefined && title !== '') {
      dbquery = `title = '${title}'`
    }

    if (is_active !== null && is_active !== undefined && is_active !== '') {
      dbquery =
        dbquery === ''
          ? `is_active = ${is_active}`
          : `${dbquery} AND is_active = ${is_active}`
    }

    let query = await Db.query(`UPDATE todos SET ${dbquery} WHERE id = '${id}'`)
    if (query.affectedRows > 0) {
      let data = await this.get(id)
      return data[0]
    } else {
      return {}
    }
  }
}

module.exports = Todo
