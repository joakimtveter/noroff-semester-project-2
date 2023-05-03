import { createHtmlElement } from "../utils";

function renderListingCard(listing) {
    const {title, description, tags, id} = listing;
    const imageUrl = listing.media[0];
    const highestBid = listing.bids.reduce((highest, bid) => {
        return bid.amount > highest ? bid.amount : highest;
    }, 0);

    const card = createHtmlElement('div', 'card');
    const img = createHtmlElement('img','card-img', null , {src: imageUrl, alt: title});
    const body = createHtmlElement('div', 'card-body');
    const cardTitle = createHtmlElement('h3', 'card-title', title);
    const cardDescription = createHtmlElement('p', 'card-description', description);
    const tagContainer = createHtmlElement('div', 'card-tags');
    const currentBid = createHtmlElement('p', 'card-current-bid', `Current bid: ${highestBid}`);

    tags.forEach(tag => {
        const tagElement = createHtmlElement('span', 'card-tag', tag);
        tagContainer.appendChild(tagElement);
    });


 
    body.appendChild(cardTitle);
    body.appendChild(tagContainer);
    body.appendChild(cardDescription);
    body.appendChild(currentBid);

    card.appendChild(img);
    card.appendChild(body);
    card.addEventListener('click', () => {
        window.location.href = `/listings/index.html?id=${id}`;
    });

    return card;
}

export {renderListingCard};