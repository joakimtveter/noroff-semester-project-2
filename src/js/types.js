/**
 * @typedef {Object} GetListingOptions
 * @property {boolean} [bids=true] - If true, includes bids in the response
 * @property {boolean} [seller=true] - If true, includes seller in the response
 */

/**
 * @typedef {Object} Bid
 * @property {string} id - Bid ID
 * @property {number} amount - Bid amount
 * @property {string} bidderName - Bidder name
 * @property {string} created - Bid creation date
 */

/**
 * @typedef {Object} Seller
 * @property {string} name - Seller name
 * @property {string} email - Seller email
 * @property {string} avatar - Seller avatar url
 * @property {string[]} wins - Listing IDs of listings the seller has won
*/

/**
 * @typedef {Object} SingleListing
 * @property {string} id - Listing ID
 * @property {string} title - Listing title
 * @property {string} description - Listing description
 * @property {string[]} media - Listing image urls
 * @property {string[]} tags - Listing tags
 * @property {string} created - Listing creation date
 * @property {string} updated - Listing update date
 * @property {string} endsAt - Listing auction end date
 * @property {Bid[]} bids - Listing of bids
 * @property {Seller} seller - The seller of the listing
 * @property {number} _count.bids - The number of bids on the listing
 */