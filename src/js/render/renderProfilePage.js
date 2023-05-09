import { createHtmlElement, getValueFromURLParameter } from '../utils';
import { renderListingCard } from '../render';
import { updateProfileMedia } from '../api';

function renderProfilePage(profile) {
    const { name, credits, avatar, wins, listings } = profile;
    const profileUser = getValueFromURLParameter('user');

    const page = createHtmlElement('div', 'content-width-container');
    const header = createHtmlElement('div', 'profile-header');

    if (avatar) {
        const avatarElement = createHtmlElement('img', 'profile-avatar', null, { src: avatar });
        header.appendChild(avatarElement);
    } else {
        const avatarElement = createHtmlElement('div', 'profile-avatar');
        const avatarLetter = createHtmlElement('span', null, name.charAt(0));
        avatarElement.appendChild(avatarLetter);
        header.appendChild(avatarElement);
    }
    const infoContainer = createHtmlElement('div', 'profile-info-container');
    header.appendChild(infoContainer);

    const nameElement = createHtmlElement('h1', 'profile-name', name);
    infoContainer.appendChild(nameElement);

    if (profileUser === null) {
        const creditsElement = createHtmlElement('p', 'profile-credits', `Available credits: ${credits} kr`);
        infoContainer.appendChild(creditsElement);

        const editAvatarButton = createHtmlElement('button', 'profile-edit-avatar-button', 'Edit Avatar');
        editAvatarButton.addEventListener('click', () => {
            document.getElementById('edit-avatar-modal').showModal();
        });
        header.appendChild(editAvatarButton);

        const editAvatarDialog = createHtmlElement('dialog', 'modal', null, { id: 'edit-avatar-modal' });
        const editAvatarForm = createHtmlElement('form');
        const editAvatarFormControl = createHtmlElement('div', 'form-control');
        const editAvatarLabel = createHtmlElement('label', null, 'Avatar URL', { for: 'edit-avatar-input' });
        const editAvatarInput = createHtmlElement('input', null, null, {
            id: 'edit-avatar-input',
            type: 'url',
            placeholder: 'Avatar URL',
            required: true,
        });
        const editAvatarSubmit = createHtmlElement('button', null, 'Save', { type: 'submit' });
        const editAvatarCancel = createHtmlElement('button', null, 'Cancel', { type: 'button' });

        editAvatarFormControl.appendChild(editAvatarLabel);
        editAvatarFormControl.appendChild(editAvatarInput);
        editAvatarForm.appendChild(editAvatarFormControl);
        editAvatarForm.appendChild(editAvatarCancel);
        editAvatarForm.appendChild(editAvatarSubmit);
        editAvatarDialog.appendChild(editAvatarForm);
        header.appendChild(editAvatarDialog);

        editAvatarCancel.addEventListener('click', (e) => {
            e.preventDefault();
            editAvatarDialog.close();
        });

        editAvatarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const avatarUrl = editAvatarInput.value;
            editAvatarDialog.close();
            updateProfileMedia(avatarUrl);
        });
    }

    page.appendChild(header);

    if (listings.length > 0) {
        const listingsContainer = createHtmlElement('div', 'listings-container');
        page.appendChild(listingsContainer);

        const listingsTitle = createHtmlElement('h2', 'profile-listings-title', 'Listings');
        listingsContainer.appendChild(listingsTitle);

        const listingsList = createHtmlElement('ul', 'listing-container');
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
