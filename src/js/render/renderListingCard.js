import { createHtmlElement, timeUntil } from '../utils';

function renderListingCard(listing) {
    const { title, description, tags, id, _count, endsAt } = listing;
    const imageUrl = listing?.media?.length > 0 ? listing.media[0] : '';
    const remaining = timeUntil(new Date(endsAt).getTime());
    const auctionEndsText = remaining ? `Auction ends in ${remaining}` : 'Auction ended';

    const card = createHtmlElement('li', 'card');
    const picture = createHtmlElement('picture', 'card-picture');
    const img = createHtmlElement('img', 'card-image', null, { src: imageUrl, alt: title });
    picture.appendChild(img);

    const body = createHtmlElement('div', 'card-body');
    const cardLink = createHtmlElement('a', 'card-link', null, { href: `/listings/single.html?id=${id}` });
    const cardTitle = createHtmlElement('h3', 'card-title', title);
    const cardDescription = createHtmlElement('p', 'card-description truncate-2', description);

    cardLink.appendChild(cardTitle);
    body.appendChild(cardLink);

    if (tags?.length > 0) {
        const tagContainer = createHtmlElement('div', 'card-tags');
        tags.forEach((tag) => {
            const tagElement = createHtmlElement('span', 'card-tag', tag);
            tagContainer.appendChild(tagElement);
        });
        body.appendChild(tagContainer);
    }

    body.appendChild(cardDescription);
    if (listing.bids) {
        const highestBid = listing.bids.reduce((highest, bid) => {
            return bid.amount > highest ? bid.amount : highest;
        }, 0);
        const currentBid = createHtmlElement(
            'p',
            'card-current-bid',
            `Current bid: ${highestBid} kr – ${_count.bids} bids`
        );
        body.appendChild(currentBid);
    }

    const timeLeft = createHtmlElement('p', 'card-time-left', auctionEndsText);
    body.appendChild(timeLeft);

    card.appendChild(picture);
    card.appendChild(body);
    card.addEventListener('click', () => {
        window.location.href = `/listings/single.html?id=${id}`;
    });

    return card;
}

export { renderListingCard };
