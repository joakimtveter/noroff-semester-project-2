import { register } from '../../api/auth/register';

const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    register(name, email, password);
});
