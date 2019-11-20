const mysql = require('mysql')
const conf = require('../../conf')

let pool = null
let connection = null

function getPool() {
  if (pool === null) {
    const config = {
      host: conf.mysql.host,
      port: conf.mysql.port,
      user: conf.mysql.username,
      password: conf.mysql.password,
      database: conf.mysql.database,
      connectionLimit: conf.mysql.connectionLimit
    }

    pool = mysql.createPool(config)
  }

  return pool
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    getPool().getConnection((err, connection) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}
