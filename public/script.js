let hide_toggle = document.querySelector('#showpassword')
let passwordInput = document.querySelector('input[name=password]')

hide_toggle.onclick = showPasswordToggle

function showPasswordToggle() {
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text'
    } else if (passwordInput.type == 'text') {
        passwordInput.type = 'password'
    }
}