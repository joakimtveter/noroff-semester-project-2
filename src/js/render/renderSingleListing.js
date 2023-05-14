import {
    createHtmlElement,
    timeSince,
    timeUntil,
    isLoggedIn,
    reload,
    showToast,
    getUserName,
    redirect,
} from '../utils';
import { submittBid, deleteListing } from '../api';

function renderSingleListing(listing) {
    const { id, title, description, endsAt, media, seller, wins, tags, bids } = listing;
    const highestBid = bids.reduce((highest, bid) => {
        return bid.amount > highest ? bid.amount : highest;
    }, 0);
    const endsAtTimestamp = new Date(endsAt).getTime();
    const nowTimestamp = new Date().getTime();
    const auctionIsOver = endsAtTimestamp < nowTimestamp;
    const isSeller = seller.name === getUserName();

    const body = createHtmlElement('div', 'listing-body');
    const imageContainer = createHtmlElement('div', 'image-container');
    const page = createHtmlElement('div', 'content-width-container col-2');

    // Images
    const mainImage = createHtmlElement('img', 'main-image', null, { src: media[0] });
    imageContainer.appendChild(mainImage);
    if (media.length > 1) {
        const thumbnails = createHtmlElement('div', 'thumbnails');

        media.forEach((image) => {
            const img = createHtmlElement('img', 'thumbnail', null, { src: image });
            img.addEventListener('click', () => {
                mainImage.src = image;
            });
            thumbnails.appendChild(img);
        });
        imageContainer.appendChild(thumbnails);
    }

    // Listing body
    const titleElement = createHtmlElement('h1', 'listing-title', title);
    body.appendChild(titleElement);

    if (isSeller) {
        const editLink = createHtmlElement('a', 'listing-edit-link', 'Edit listing', {
            href: `/listings/edit.html?id=${id}`,
        });
        body.appendChild(editLink);

        const deleteButton = createHtmlElement('button', 'listing-delete-button', 'Delete listing');
        deleteButton.addEventListener('click', () => {
            deleteListing(id);
            redirect('/profile.html', 500);
        });
        body.appendChild(deleteButton);
    }

    const descriptionElement = createHtmlElement('p', 'listing-description', description);
    body.appendChild(descriptionElement);

    if (tags.length > 0) {
        const tagsContainer = createHtmlElement('div', 'listing-tags');
        tags.forEach((tag) => {
            const tagElement = createHtmlElement('span', 'listing-tag', tag);
            tagsContainer.appendChild(tagElement);
        });
        body.appendChild(tagsContainer);
    }

    const currentBidElement = createHtmlElement('p', 'listing-current-bid', `Current bid: ${highestBid} kr`);
    body.appendChild(currentBidElement);

    const endsAtElement = createHtmlElement(
        'p',
        'listing-ends-at',
        auctionIsOver ? 'Auction has ended' : `Auction ends in ${timeUntil(endsAtTimestamp)}`
    );
    body.appendChild(endsAtElement);

    const sellerContainer = createHtmlElement('div', 'listing-seller');
    if (seller.avatar !== null) {
        const sellerAvatar = createHtmlElement('img', 'listing-seller-avatar', null, { src: seller.avatar });
        sellerContainer.appendChild(sellerAvatar);
    } else {
        const sellerAvatar = createHtmlElement('div', 'listing-seller-avatar', seller.name.charAt(0));
        sellerContainer.appendChild(sellerAvatar);
    }
    const sellerName = createHtmlElement('p', 'listing-seller-name', seller.name);
    const sellerWins = createHtmlElement('p', 'listing-seller-won', `${seller.wins.length || 0} auctions won`);
    sellerContainer.appendChild(sellerName);
    sellerContainer.appendChild(sellerWins);
    body.appendChild(sellerContainer);

    // Bid form - Only if logged in and auction is not over
    if (!auctionIsOver && isLoggedIn() && !isSeller) {
        const bidForm = createHtmlElement('form', 'listing-bid-form');
        const bidInput = createHtmlElement('input', 'listing-bid-input', null, {
            name: 'bid',
            type: 'number',
            min: highestBid + 1 || 1,
            value: highestBid + 1 || 1,
        });
        const bidButton = createHtmlElement('button', 'listing-bid-button', 'Place bid', { type: 'submit' });

        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);
        bidForm.addEventListener('submit', (event) => {
            event.preventDefault();
            try {
                submittBid(id, bidInput.value);
                showToast('Bid placed', 'success');
                reload(3200);
            } catch (error) {
                console.error(error);
                showToast(error, 'error');
            }
        });
        body.appendChild(bidForm);
    }

    // Bid history - Only if there are bids
    if (bids.length > 0) {
        const bidContainer = createHtmlElement('div', 'listing-bid-container');
        const bidTitle = createHtmlElement('h2', 'listing-bid-title', 'Bid History');
        bidContainer.appendChild(bidTitle);

        bids.sort((a, b) => (a.amount < b.amount ? 1 : -1)).forEach((bid) => {
            const bidElement = createHtmlElement('div', 'listing-bid');
            const bidAmount = createHtmlElement('p', 'listing-bid-amount', `${bid.amount} kr`);
            const bidUser = createHtmlElement('p', 'listing-bid-user', bid.bidderName);
            const bidDate = createHtmlElement('p', 'listing-bid-date', timeSince(new Date(bid.created)));

            bidElement.appendChild(bidAmount);
            bidElement.appendChild(bidUser);
            bidElement.appendChild(bidDate);
            bidContainer.appendChild(bidElement);
            body.appendChild(bidContainer);
        });
    }

    page.appendChild(imageContainer);
    page.appendChild(body);

    return page;
}

export { renderSingleListing };
