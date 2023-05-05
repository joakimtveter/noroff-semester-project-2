import { get } from '../get';

/**
 * Get listings from the API
 * @param {Object} options - Options for the query
 * @param {string} options.sort - The field to sort by
 * @param {string} options.order - The order to sort by
 * @param {number} options.limit - The number of listings to return
 * @param {number} options.offset - The offset to start from
 * @param {string} options.tag - The tag to filter by
 * @param {boolean} options.active - Whether to return only active listings
 * @param {boolean} options.seller - Whether to add seller object to listing
 * @param {boolean} options.bids - Whether to add bids array to listing
 * @returns {Promise<Object[]>} - A promise that resolves to an array of listings
 */

function getListings(options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${options.sort}`);
    if (options.order) parameters.push(`sort=${options.sort}`);
    if (options.limit) parameters.push(`limit=${options.limit}`);
    if (options.offset) parameters.push(`offset=${options.offset}`);
    if (options.tag) parameters.push(`tag=${options.tag}`);
    if (options.active) parameters.push(`_active=${options.active}`);
    if (options.seller) parameters.push(`_seller=${options.seller}`);
    if (options.bids) parameters.push(`_bids=${options.bids}`);

    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return get(`/listings${queryParams}`);
}

export { getListings };
