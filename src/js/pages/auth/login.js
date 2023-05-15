import { login } from '../../api/auth/login';
import { isLoggedIn, redirect, showToast } from '../../utils.js';
import { validateLoginForm, handleFormErrors, clearFormErrors } from '../../validation';

if (isLoggedIn()) redirect('/index.html');

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = validateLoginForm(email, password);
    if (errors.length > 0) {
        handleFormErrors(e.target, errors);
    } else {
        clearFormErrors(e.target);
        await login(email, password);
    }
});
