import { getListings } from '../api';
import { renderListingCard } from '../render';
import { createHtmlElement, showToast } from '../utils';

const recentListingsContainer = document.getElementById('recent-listings');
const closingListingsContainer = document.getElementById('closing-listings');
const trendingListingsContainer = document.getElementById('trending-listings');
const headlineListings = [];
const highlight1 = document.getElementById('highlight1');
const highlight2 = document.getElementById('highlight2');

try {
    const allListings = await getListings({
        bids: true,
        seller: true,
        active: true,
        sort: 'created',
        sortOrder: 'desc',
    });

    allListings
        .filter((listing) => listing._count.bids > 1)
        .sort((a, b) => b.bids[0].amount - a.bids[0].amount)
        .slice(0, 2)
        .forEach((listing) => {
            headlineListings.push(listing);
        });

    allListings
        .sort((a, b) => b.bids.length - a.bids.length)
        .slice(0, 6)
        .forEach((listing) => {
            const card = renderListingCard(listing);
            trendingListingsContainer.appendChild(card);
        });
    const highlightImage1 = createHtmlElement('img', null, null, {
        src: headlineListings[0].media[0],
        alt: headlineListings[0].title,
    });

    const highlightImage2 = createHtmlElement('img', null, null, {
        src: headlineListings[1].media[0],
        alt: headlineListings[1].title,
    });
    const highlight1Content = createHtmlElement('div', 'highlight__content');
    const highlight2Content = createHtmlElement('div', 'highlight__content');
    const highlight1Title = createHtmlElement('h2', 'highlight__title', headlineListings[0].title);
    const highlight2Title = createHtmlElement('h2', 'highlight__title', headlineListings[1].title);
    const highlight1Link = createHtmlElement('a', 'highlight__link', 'View Listing', {
        href: `/listings/single.html?id=${headlineListings[0].id}`,
    });
    const highlight2Link = createHtmlElement('a', 'highlight__link', 'View Listing', {
        href: `/listings/single.html?id=${headlineListings[1].id}`,
    });

    highlight1.appendChild(highlightImage1);
    highlight1Content.appendChild(highlight1Title);
    highlight1Content.appendChild(highlight1Link);
    highlight1.appendChild(highlight1Content);
    highlight2.appendChild(highlightImage2);
    highlight2Content.appendChild(highlight2Title);
    highlight2Content.appendChild(highlight2Link);
    highlight2.appendChild(highlight2Content);
} catch (error) {
    console.error(error);
    showToast('error', error.message);
}

try {
    const resentListings = await getListings({
        limit: 6,
        bids: true,
        seller: true,
        active: true,
        sort: 'created',
        sortOrder: 'desc',
    });
    resentListings.forEach((listing) => {
        const card = renderListingCard(listing);
        recentListingsContainer.appendChild(card);
    });
} catch (error) {
    console.error(error);
    showToast('error', error.message);
}

try {
    const listingsEndingSoon = await getListings({
        limit: 6,
        bids: true,
        seller: true,
        active: true,
        sort: 'endsAt',
        sortOrder: 'asc',
    });
    listingsEndingSoon.forEach((listing) => {
        const card = renderListingCard(listing);
        closingListingsContainer.appendChild(card);
    });
} catch (error) {
    console.error(error);
    showToast('error', error.message);
}
