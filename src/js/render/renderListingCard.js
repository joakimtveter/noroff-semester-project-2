import { createHtmlElement, timeUntil } from '../utils';

function renderListingCard(listing) {
    const { title, description, tags, id, _count, endsAt } = listing;
    const imageUrl = listing.media.length > 0 ? listing.media[0] : '';
    const highestBid = listing.bids.reduce((highest, bid) => {
        return bid.amount > highest ? bid.amount : highest;
    }, 0);
    const remaining = timeUntil(new Date(endsAt).getTime());
    console.log('ends at: ', endsAt, 'remaining: ', remaining);

    const card = createHtmlElement('div', 'card');
    const picture = createHtmlElement('picture', 'card-picture');

    const img = createHtmlElement('img', 'card-image', null, { src: imageUrl, alt: title });
    const body = createHtmlElement('div', 'card-body');
    const cardTitle = createHtmlElement('h3', 'card-title', title);
    const cardDescription = createHtmlElement('p', 'card-description', description);
    const tagContainer = createHtmlElement('div', 'card-tags');
    const currentBid = createHtmlElement(
        'p',
        'card-current-bid',
        `Current bid: ${highestBid} kr – ${_count.bids} bids`
    );
    const timeLeft = createHtmlElement('p', 'card-time-left', `Time left: ${remaining}`);

    tags.forEach((tag) => {
        const tagElement = createHtmlElement('span', 'card-tag', tag);
        tagContainer.appendChild(tagElement);
    });

    body.appendChild(cardTitle);
    body.appendChild(tagContainer);
    body.appendChild(cardDescription);
    body.appendChild(currentBid);
    body.appendChild(timeLeft);

    picture.appendChild(img);
    card.appendChild(picture);
    card.appendChild(body);
    card.addEventListener('click', () => {
        window.location.href = `/listings/single.html?id=${id}`;
    });

    return card;
}

export { renderListingCard };
