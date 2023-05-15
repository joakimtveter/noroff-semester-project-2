import { stringIsLongerThan, stringIsShorterThan } from '../validation.js';

/**
 * Validates the login form.
 * @param {string} title
 * @returns {object[]} - An array of error objects.
 */
function validateCreateListingForm(data) {
    const { title, endsAt } = data;

    let errors = [];
    if (!stringIsLongerThan(title)) {
        errors.push({ field: 'title', message: 'Title is a required field.' });
    }
    if (!stringIsShorterThan(title, 280)) {
        errors.push({ field: 'title', message: 'Title must be shorter than 280 characters.' });
    }

    if (!stringIsLongerThan(endsAt)) {
        errors.push({ field: 'endsAt', message: 'Auction Ends is a required field.' });
    }

    return errors;
}

export { validateCreateListingForm };
