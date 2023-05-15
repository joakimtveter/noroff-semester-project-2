import {
    isValidEmail,
    stringIsLongerThan,
    stringIsShorterThan,
    isNoroffStudentEmail,
    isValidUsername,
} from '../validation.js';

/**
 * Validates the registration form.
 * @param {string} email - A Noroff student email address
 * @param {string} password
 * @param {string} name
 * @returns {object[]} - An array of error objects
 */
function validateRegistrationForm(email, password, name) {
    let errors = [];
    if (!stringIsLongerThan(name)) {
        errors.push({ field: 'name', message: 'Name is a required field.' });
    }
    if (stringIsLongerThan(name) && !stringIsLongerThan(name, 3)) {
        errors.push({ field: 'name', message: 'Name must be atleast 3 characters.' });
    }
    if (!stringIsShorterThan(name, 20)) {
        errors.push({ field: 'name', message: 'Name must be shorer than 20 characters.' });
    }
    if (!isValidUsername(name)) {
        errors.push({ field: 'name', message: 'Name may only contain letters, numbers and underscores.' });
    }

    if (!stringIsLongerThan(email)) {
        errors.push({ field: 'email', message: 'Email is a required field.' });
    }
    if (!isValidEmail(email)) {
        errors.push({ field: 'email', message: 'Email is not a valid email.' });
    }
    if (isValidEmail(email) && !isNoroffStudentEmail(email)) {
        errors.push({ field: 'email', message: 'Email is not a valid Noroff Student email.' });
    }

    if (!stringIsLongerThan(password, 1)) {
        errors.push({ field: 'password', message: 'Password is a required field.' });
    }
    if (stringIsLongerThan(password, 1) && !stringIsLongerThan(password, 8)) {
        errors.push({ field: 'password', message: 'Password must be longer than 8 characters.' });
    }

    return errors;
}

export { validateRegistrationForm };
