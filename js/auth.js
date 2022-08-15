export const auth = () => {

    const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      buttonOut = document.querySelector('.button-out'),
      userName = document.querySelector('.user-name'),
      buttonCart = document.querySelector('.button-cart'),
      closeAuth = document.querySelector('.close-auth');

    const logInForm = document.getElementById('logInForm'),
        inputLogin = document.getElementById('login'),
        inputPassword = document.getElementById('password');

    const login = (user) => {
        buttonAuth.style.display = 'none'

        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        buttonCart.style.display = 'flex'

        userName.textContent = user.login
        modalAuth.style.display = 'none'
    }

    const logout = () => {
        buttonAuth.style.display = 'flex'

        buttonOut.style.display = 'none'
        userName.style.display = 'none'
        buttonCart.style.display = 'none'

        userName.textContent = ''

        localStorage.removeItem('user')

    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none'
    })

    buttonOut.addEventListener('click', () => {
        logout()
    })

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }

        if (user.login.trim() === '') {
            inputLogin.style.background = '#f5d5d5';
        } else if (user.password.trim() === '') {
            inputPassword.style.background = '#f5d5d5';
        } else {
            localStorage.setItem('user', JSON.stringify(user));
            login(user);
            inputLogin.style.background = 'none';
            inputPassword.style.background = 'none';
        }
        // localStorage.setItem('user', JSON.stringify(user))
        // login(user)
    })

    if (localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')));
    }
    
}