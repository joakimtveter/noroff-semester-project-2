import { createHtmlElement } from '../utils';
import { renderListingCard } from '../render';
import { getListingById } from '../api';

function renderProfilePage(profile) {
    const { name, credits, avatar, wins, listings, _count } = profile;

    const page = createHtmlElement('div', 'content-width-container');
    const header = createHtmlElement('div', 'profile-header');

    if (avatar) {
        const avatarElement = createHtmlElement('img', 'profile-avatar', null, { src: avatar });
        header.appendChild(avatarElement);
    } else {
        const avatarElement = createHtmlElement('div', 'profile-avatar', name.charAt(0));
        header.appendChild(avatarElement);
    }
    const infoContainer = createHtmlElement('div', 'profile-info-container');
    header.appendChild(infoContainer);

    const nameElement = createHtmlElement('h1', 'profile-name', name);
    infoContainer.appendChild(nameElement);

    const creditsElement = createHtmlElement('p', 'profile-credits', `Available credits: ${credits} kr`);
    infoContainer.appendChild(creditsElement);

    page.appendChild(header);

    if (listings.length > 0) {
        const listingsContainer = createHtmlElement('div', 'profile-listings-container');
        page.appendChild(listingsContainer);

        const listingsTitle = createHtmlElement('h2', 'profile-listings-title', 'Listings');
        listingsContainer.appendChild(listingsTitle);

        const listingsList = createHtmlElement('ul', 'profile-listings-list');
        listingsContainer.appendChild(listingsList);

        listings.forEach((listing) => {
            const card = renderListingCard(listing);
            listingsList.appendChild(card);
        });
    }

    if (wins.length > 0) {
        const winsContainer = createHtmlElement('div', 'profile-wins-container');
        page.appendChild(winsContainer);

        const winsTitle = createHtmlElement('h2', 'profile-wins-title', `Won auctions – ${wins.length}`);
        winsContainer.appendChild(winsTitle);

        const winsList = createHtmlElement('ul', 'profile-wins-list');

        wins.forEach((win, i) => {
            const winItem = createHtmlElement('li', 'profile-wins-list-item');
            const winLink = createHtmlElement('a', null, `View listing ${i + 1}`, {
                href: `/listings/single.html?id=${win}`,
            });
            winItem.appendChild(winLink);
            winsList.appendChild(winItem);
        });
        winsContainer.appendChild(winsList);
    }

    return page;
}

export { renderProfilePage };
