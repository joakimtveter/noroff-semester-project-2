import { isValidEmail, stringIsLongerThan } from '../validation.js';

/**
 * Validates the login form.
 * @param {string} email
 * @param {string} password
 * @returns {object[]} - An array of error objects.
 */
function validateLoginForm(email, password) {
    let errors = [];
    if (!stringIsLongerThan(email)) errors.push({ field: 'email', message: 'Email is a required field.' });
    if (!isValidEmail(email)) errors.push({ field: 'email', message: 'Email is not a valid email.' });
    if (!stringIsLongerThan(password)) errors.push({ field: 'password', message: 'Password is a required field.' });

    return errors;
}

export { validateLoginForm };
