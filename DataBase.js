const pg = require('pg')

// connection to the database
const pool = new pg.Pool({
    user: 'postgres',
    password: 'adminroot',
    host: 'localhost',
    port: 5432,
    database: 'basicAuth'
})

module.exports = pool