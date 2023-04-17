import { BASE_URL } from '../../client.js';
import { showToast, redirect } from '../../utils.js';

/**
 * Logs in user and sets userobjet in localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} - Returns nothing, redirects to main feed on success or triggers a error toast on error.
 */
async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(`${data.statusCode} ${data.status} - ${data.errors[0].message}`);
        }
        const data = await response.json();
        const { accessToken, ...user } = data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        redirect('/index.html');
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { login };
