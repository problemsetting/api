const util = require('util')
const mysql = require('mysql')
const config = require('../config.json')

const configEnv = config[process.env.PROBLEM_SETTING_ENV || 'local']
const pool = mysql.createPool({
    host: configEnv.host,
    user: configEnv.user,
    password: configEnv.password,
    database: configEnv.database,
    connectionLimit: configEnv.connectionLimit
})

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)
