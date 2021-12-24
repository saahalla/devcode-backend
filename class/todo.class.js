let __mysql = require('./mysql.class')
let Db = new __mysql()
let __activity = require('./activity.class')
let Activity = new __activity()

class Todo {
  getAll(activity_group_id = null) {
    let data = []
    if (activity_group_id) {
      data = Db.query(
        `SELECT * FROM todo WHERE delete_at IS NULL AND activity_group_id = '${activity_group_id}'`,
      )
    } else {
      data = Db.query('SELECT * FROM todo WHERE delete_at IS NULL')
    }
    return data
  }

  get(id) {
    let data = Db.query(
      `SELECT * FROM todo WHERE id='${id}' AND delete_at IS NULL`,
    )
    return data
  }

  async add(data) {
    let activity = await Activity.get(data.activity_group_id)
    if (activity.length > 0) {
      let insertData = data
      insertData.create_at = new Date().toISOString()
      insertData.update_at = insertData.create_at

      // return insertData
      let query = await Db.queryData(`INSERT INTO todo SET ?`, insertData)

      console.log(query)
      if (query.affectedRows > 0) {
        let id = query.insertId
        let data = await this.get(id)
        console.log('data', data[0])

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
      `UPDATE todo SET delete_at = '${deletedDate}' WHERE id='${id}'`,
    )
    if (query.affectedRows > 0) {
      return true
    } else {
      return false
    }
  }

  async update(id, title) {
    let query = await Db.query(
      `UPDATE todo SET title = '${title}' WHERE id = '${id}'`,
    )
    if (query.affectedRows > 0) {
      let data = await this.get(id)
      return data[0]
    } else {
      return {}
    }
  }
}

module.exports = Todo
