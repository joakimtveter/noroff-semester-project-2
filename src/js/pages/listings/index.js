import { getListings } from '../../api';
import { renderListingCard } from '../../render';

const allListingsContainer = document.getElementById('all-listings');

const listings = await getListings({ bids: true, seller: true, active: true });
console.log(listings);

listings.forEach((listing) => {
    const card = renderListingCard(listing);
    allListingsContainer.appendChild(card);
});
