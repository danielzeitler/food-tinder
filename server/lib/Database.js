const mysql = require('mysql')
const config = require('../config.js')

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config)

    this.connection.connect(err => {
      if(err) throw new Error(err);
      console.log(`Linked to Database ${config.database} on Port ${config.port}`)
    })
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if(err) return reject(err)
        resolve(rows)
      })
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if(err) return reject(err);
        resolve()
      })
    })
  }
}

module.exports = new Database(config.mysqlConfig)