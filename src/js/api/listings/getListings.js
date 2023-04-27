import { get } from '../get';

function getListings() {
    return get(`/listings`);
}

export { getListings };
