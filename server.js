const express = require('express')
const basicAuth = require('basic-auth')
const bodyParser = require('body-parser')
const pg = require('pg')
const app = express()

//middleware for queries to parse them into JSON
app.use(bodyParser.urlencoded({ extended: true }))

// connection to the database
const pool = new pg.Pool({
    user: 'postgres',
    password: 'adminroot',
    host: 'localhost',
    port: 5432,
    database: 'basicAuth'
})

//function that validate fields when user register and if they fine insert new user into db
function checkFields(login, password, req, res) {
    if (login.length < 5) {
        res.send(`<script>alert('Login is too short, it must be longer than 5 characters'); window.history.back()</script>`)
    } else if (password.length < 6) {
        res.send(`<script>alert('Password is too short, it must be longer than 6 characters'); window.history.back()</script>`)
    } else if ( /[0-9]/.test(password) == false) {
        res.send(`<script>alert('Password must contain numbers'); window.history.back()</script>`)
    } else if (/[а-яА-Я]/.test(password) == true) {
        res.send(`<script>alert('Password must contain only English letters'); window.history.back()</script>`)
    } else if (/[а-яА-Я]/.test(login) == true) {
        res.send(`<script>alert('Login must contain only English letters'); window.history.back()</script>`)
    } else if (pool.query('SELECT EXISTS (SELECT 1 FROM "UsersTable" WHERE username = $1)', [login])) {
        res.send(`<script>alert('This login alredy exists'); window.history.back()</script>`)
    } else {
        pool.query('INSERT INTO "UsersTable" (username, password) VALUES ($1, $2)', [login, password], (err, result) => {
            if(err) {
                console.error('Error executing query:', err);
            } else {
                res.send(`<script>alert('You were succsessfully registered!'); window.location.href = 'index.html?formSubmitted=true'</script>`)
            }
        })
    }
}

// function that checks login and password
function checkUser(username, password) {
    if (pool.query('SELECT EXISTS (SELECT * FROM "UsersTable" WHERE username = $1 AND password = $2) AS userfound', [username, password])) {
        return true
    } else {
        return false
    }
}

// authentication middleware
function authMiddleWare(req, res, next) {
    // create variable for saving credentials from request
    let credentials = basicAuth(req)

    // check request for emptiness and check credentials with checkUser() function
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

app.post('/submit_form', function(req, res){
    checkFields(req.body.login, req.body.password, req, res)
})

// Indicate from which folder to take static files (css files or scripts)
app.use(express.static('public'))

// Running server on 3000 port that will listen to requests
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000')
})