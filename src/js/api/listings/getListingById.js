import { get } from '../get';
import '../../types';

/**
 * Fetches a single listing by ID from the API.
 * @param {string} id - Listing ID
 * @param {GetListingOptions} options - Query parameter options for the request
 * @returns {Promise<SingleListing>} - An object with a single listing
 */
async function getListingById(id, options = {}) {
    if (!id) return null;
    const {bids = true, seller = true} = options;
    let query = [];
    if (bids) query.push('_bids=true');
    if (seller) query.push('_seller=true');
    if (query.length) query = `?${query.join('&')}`;
    return await get(`/listings/${id + query}`);  
}

export { getListingById }

