import { login } from '../../api/auth/login';
import { isLoggedIn, redirect } from '../../utils.js';

if (isLoggedIn()) redirect('/index.html');

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    login(email, password);
});
