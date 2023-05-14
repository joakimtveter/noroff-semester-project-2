import { getUserObject, createHtmlElement } from '../utils';

let user = getUserObject();

function renderMainNavigation() {
    const mainNavigation = document.getElementById('main-navigation-list');
    // Login Button or Avatar
    if (user) {
        const listItemCreateListing = createHtmlElement('li', 'nav-item');
        const createListingLink = createHtmlElement('a', 'nav-link button', 'Create Listing', {
            href: '/listings/create.html',
        });
        listItemCreateListing.appendChild(createListingLink);
        mainNavigation.appendChild(listItemCreateListing);

        const listItem = createHtmlElement('li', 'nav-item');
        const profileButton = createHtmlElement('a', 'nav-link profile-link', null, {
            href: '/profile.html',
        });
        if (user.avatar) {
            const avatar = createHtmlElement('img', 'profile-avatar', null, { src: user.avatar });
            profileButton.appendChild(avatar);
        } else {
            const initial = createHtmlElement('span', null, user.name[0]);
            profileButton.appendChild(initial);
        }
        listItem.appendChild(profileButton);
        mainNavigation.appendChild(listItem);
    } else {
        const listItem = createHtmlElement('li', 'nav-item');
        const loginButton = createHtmlElement('a', 'nav-link button', 'Login', { href: '/auth/login.html' });

        listItem.appendChild(loginButton);
        mainNavigation.appendChild(listItem);
    }
}
export { renderMainNavigation };
