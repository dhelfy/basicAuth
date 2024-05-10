class RegistrationController {
    //method that validate fields when user register and if they fine insert new user into db
    checkFields(login, password, req, res) {
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
} 

module.exports = new RegistrationController()