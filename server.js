const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const RegistrationController = require('./RegistrationController.js')
const AuthController = require('./AuthController.js')

//middleware for queries to parse them into JSON
app.use(bodyParser.urlencoded({ extended: true }))

// request handlers
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/secured.html', AuthController.authMW, function(req, res) {
    res.sendFile(__dirname + '/secured.html')
})

app.get('/registration.html', function(req, res) {
    res.sendFile(__dirname + '/registration.html')
})

app.post('/submit_form', function(req, res){
    RegistrationController.checkFields(req.body.login, req.body.password, req, res)
})

// Indicate from which folder to take static files (as example css files or scripts)
app.use(express.static('public'))

// Running server on 3000 port that will listen to requests
app.listen(3000, () => {
    console.log('Server is running on 3000 port')
})