import { post } from '../post';
import { reload } from '../../utils';
import '../../types';

/**
 * Submits a bid to a listing.
 * @param {string} id - Listing ID
 * @param {number} amount - Bid amount
 */
async function submittBid(id, amount) {
    if (!id) throw new Error('No ID provided to submittBid()');
    if (!amount) throw new Error('No amount provided to submittBid()');
    if (amount < 0) throw new Error('Bid amount cannot be negative');
    const newAmount = parseInt(amount);
    if (typeof newAmount !== 'number') throw new Error('Bid amount must be a number');
    return await post(`/listings/${id}/bids`, { amount: newAmount });
    reload(500);
}

export { submittBid };
