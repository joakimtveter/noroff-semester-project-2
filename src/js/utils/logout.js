import { reload } from './reload';

/**
 * Logs out current user, by deleting the token and user object from local storage.
 * @returns {void} - Removes user object and accesstoken from local storage and reloads the page
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    reload();
}

export { logout };
