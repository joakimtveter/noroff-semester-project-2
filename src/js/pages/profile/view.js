import { showToast, getUserName, getValueFromURLParameter } from '../../utils';
import { getSingleProfile } from '../../api';
import { renderProfilePage } from '../../render';

const userName = getUserName();
const userId = getValueFromURLParameter('user');
let profileName = '';

// If user is not loged in, and there is no query parameters, redirect to login page
if (!userId && !userName) window.location.href = '/auth/login.html';

// If there is a user query parameter, set profile name variable to the query parameter value.
// If there is no user query parameter, set profile name to logged in users username.
if (userId) {
    profileName = userId;
} else {
    profileName = userName;
}

const main = document.getElementById('main-content');

// Fetch profile data from API and render profile page
try {
    const profileData = await getSingleProfile(profileName, true);
    console.log(profileData);
    main.appendChild(renderProfilePage(profileData));
    document.title = `${profileData.name}'s profile | The Auction House`;
} catch (error) {
    console.error(error);
    showToast(error);
}
