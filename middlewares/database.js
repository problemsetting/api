const util = require('util')
const mysql = require('mysql')
const flags = require('flags')
const config = require('../config.json')

const envFlag = flags.get('env')
if (config[envFlag] === undefined) {
    throw Error('No config found for the current env.')
}

const databaseConfig = {}
Object.assign(databaseConfig, config[envFlag].database)
const pool = mysql.createPool(databaseConfig)

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        else {
            console.error(err.code, err)
        }
    }
    else {
        console.log('Database connected succesfully.')
    }

    if (connection) connection.release()
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

function appendPoolMiddleware(req, res, next) {
    req.pool = pool
    next()
}

module.exports = appendPoolMiddleware
