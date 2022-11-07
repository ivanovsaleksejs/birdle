const { Pool, Client } = require('pg')
const config = require('config')

const env = process.env

const db = config.get('db')

const pool = new Pool(
  {
    host : db.host || env.PG_HOST,
    user : db.user || env.PG_USER,
    password : db.password || env.PG_PASSWORD,
    database : db.database || env.PG_DATABASE,
    port : db.port || env.PG_PORT
  }
)

module.exports = pool
