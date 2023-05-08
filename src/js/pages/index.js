import { getListings } from '../api';
import { renderListingCard } from '../render';

const allListingsContainer = document.getElementById('all-listings');

const listings = await getListings({ limit: 6, bids: true, seller: true, active: true });

listings.forEach((listing) => {
    const card = renderListingCard(listing);
    allListingsContainer.appendChild(card);
});
