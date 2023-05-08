import { get } from '../get';

async function getSingleProfile(name, listings = false) {
    if (listings) return get(`/profiles/${name}?_listings=true`);
    return get(`/profiles/${name}`);
}

export { getSingleProfile };
