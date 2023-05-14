import { getValueFromURLParameter } from '../utils';
import { getListings } from '../api';
import { renderListingCard } from '../render';

const searchInput = document.getElementById('search-input');
const searchTerm = getValueFromURLParameter('q');
const searchResultsContainer = document.getElementById('search-results');

if (searchTerm) searchInput.value = searchTerm;

const allListings = await getListings({ seller: true, bids: true, active: true });
const searchResults = allListings.filter((listing) => {
    if (listing.title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    // if (listing?.description.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    if (listing.seller.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    // if (listing.tags.forEach((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return true;
    return false;
});

if (searchResults.length > 0) {
    searchResults.forEach((listing) => {
        const card = renderListingCard(listing);
        searchResultsContainer.appendChild(card);
    });
} else {
    document.getElementById('title').innerText = `${searchResults.length}${searchTerm}`;
}

document.title = `Search results for "${searchTerm}" | The Auction House`;
document.getElementById('title').innerText = `Search results for "${searchTerm}"`;
document.getElementById('number-of-results').innerText = searchResults.length;
