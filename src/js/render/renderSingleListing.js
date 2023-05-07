import { createHtmlElement, timeSince, isLoggedIn } from '../utils';
import { submittBid } from '../api';

function renderSingleListing(listing) {
    const { title, description, endsAt, media, seller, wins, tags, bids } = listing;
    const highestBid = bids.reduce((highest, bid) => {
        return bid.amount > highest ? bid.amount : highest;
    }, 0);

    // Page Structure
    const body = createHtmlElement('div', 'listing-body');
    const imageContainer = createHtmlElement('div', 'image-container');
    const page = createHtmlElement('div', 'content-width-container col-2');

    // Image container
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

    // Body
    const titleElement = createHtmlElement('h1', 'listing-title', title);
    body.appendChild(titleElement);

    const descriptionElement = createHtmlElement('p', 'listing-description', description);
    body.appendChild(descriptionElement);

    const currentBidElement = createHtmlElement('p', 'listing-current-bid', `Current bid: ${highestBid} kr`);
    body.appendChild(currentBidElement);

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

    // Bid form

    if (new Date(endsAt).getTime() > new Date().getTime() && isLoggedIn()) {
        const bidForm = createHtmlElement('form', 'listing-bid-form');
        const bidInput = createHtmlElement('input', 'listing-bid-input', null, {
            name: 'bid',
            type: 'number',
            min: highestBid + 1,
            value: highestBid + 1,
        });
        const bidButton = createHtmlElement('button', 'listing-bid-button', 'Place bid', { type: 'submit' });

        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);
        bidForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Bid placed');
        });
        body.appendChild(bidForm);
    }

    // Bids
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
    });

    // Assemble page

    body.appendChild(bidContainer);

    page.appendChild(imageContainer);
    page.appendChild(body);

    return page;
}

export { renderSingleListing };

// const images = data.media;

// title.innerText = data.title;
// description.innerText = data.description;
// currentBid.innerText = data.currentBid;

// currentBid.innerText = highestBid;
// bidInput.min = highestBid + 1;
// bidInput.value = highestBid + 1;
// mainImage.src = images[0];

// images.forEach((image) => {
//     const img = createHtmlElement('img', 'thumbnail', null, { src: image });
//     img.addEventListener('click', () => {
//         mainImage.src = image;
//     });
//     thumbnails.appendChild(img);
// });
// document.title = data.title + ' for sale | The Auction House';
// metaDescription.setAttribute('content', data.description);
