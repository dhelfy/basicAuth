const express = require('express')
const basicAuth = require('basic-auth')
const app = express()
const pg = require('pg')

// Connection to the database
const pool = new pg.Pool({
    user: 'postgres',
    password: 'adminroot',
    host: 'localhost',
    port: 5432,
    database: 'basicAuth'
})

// Function that checks login and password
function checkUser(username, password) {
    if (username === 'dhelfy' && password === 'pass1235') {
        return true
    } else {
        return false
    }
}

// authentication middleware
function authMiddleWare(req, res, next) {
    // Create variable for saving credentials from request
    let credentials = basicAuth(req)

    // Check request for emptiness and check credentials with checkUser() function
    if (!credentials || !checkUser(credentials.name, credentials.pass)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="This page requires authentication"')
        res.status(401).send('Anauthorized')
    } else {
        next()
    }
}

// request handlers
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/secured.html', authMiddleWare, function(req, res) {
    res.sendFile(__dirname + '/secured.html')
})

app.get('/registration.html', function(req, res) {
    res.sendFile(__dirname + '/registration.html')
})

// Indicate from which folder to take static files (css files or scripts)
app.use(express.static('public'))

// Running server on 3000 port that will listen to requests
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000')
})