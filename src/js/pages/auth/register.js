import { register } from '../../api/auth/register';
import { isLoggedIn, redirect } from '../../utils.js';
import { validateRegistrationForm, handleFormErrors, clearFormErrors } from '../../validation';

if (isLoggedIn()) redirect('/index.html');

const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(registerForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const errors = validateRegistrationForm(email, password, name);
        if (errors.length > 0) {
            handleFormErrors(e.target, errors);
        } else {
            clearFormErrors(e.target);
            await register(email, password, name);
        }
    } catch (error) {
        console.error(error);
        showToast('error', 'Something went wrong!');
    }
});
