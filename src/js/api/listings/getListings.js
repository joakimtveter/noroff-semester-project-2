import { BASE_URL } from '../../client';
import { get } from '../get';

function getListings() {
    return get(`/listings`);
}

export { getListings };
