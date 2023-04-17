import { showToast, redirect } from '../../utils';
import { BASE_URL } from '../../client';
/**
 * Registers a new user and redirects to login.html
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} - Returns nothing, redirects to login.html on success or triggers a error toast on error.
 */
async function register(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        showToast(`${data.name} have successfully registered`, 'success');
        redirect('/auth/login.html', 3000);
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { register };
