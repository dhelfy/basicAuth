const basicAuth = require('basic-auth')
const pool = require('./DataBase.js')

class AuthController {
    // method that checks login and password
    static async checkUser(username, password) {
        const result = await pool.query('SELECT EXISTS (SELECT * FROM "UsersTable" WHERE username = $1 AND password = $2) AS userfound', [username, password])

        const userFound = result.rows[0].userfound
        
        return userFound;
    }

    // authentication middleware
    async authMW(req, res, next) {
        // create variable for saving credentials from request
        let credentials = basicAuth(req)
    
        // check request for emptiness and check credentials with checkUser() function
        if (!credentials || !(await AuthController.checkUser(credentials.name, credentials.pass))) {
            res.setHeader('WWW-Authenticate', 'Basic realm="This page requires authentication"')
            res.status(401).send('Anauthorized')
        } else {
            next()
        }
    }
} 

module.exports = new AuthController()