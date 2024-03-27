// Подключаем все необходимые пакеты
const express = require('express')
const basicAuth = require('basic-auth')
const app = express()

// Функция для проверки логина и пароля
function checkUser(username, password) {
    if (username === 'dhelfy' && password === 'pass1235') {
        return true
    } else {
        return false
    }
}

// Middleware для авторизации
function authMiddleWare(req, res, next) {
    // Создаем переменную куда положим реквизиты для входа из запроса
    let credentials = basicAuth(req)

    // Проверяем запрос на заполненность и проверяем реквизиты с помощью функции checkUser
    if (!credentials || !checkUser(credentials.name, credentials.pass)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="This page requires authentication"')
        res.status(401).send('Anauthorized')
    } else {
        next()
    }
}

// Два обработчика запросов на два url
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/secured.html', authMiddleWare, function(req, res) {
    res.sendFile(__dirname + '/secured.html')
})

// Запуск сервера который будет слушать запросы на 3000 порту
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000')
})