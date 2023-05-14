import { post } from '../post';

async function createListing(reqestBody) {
    const response = await post('/listings', reqestBody);
}

export { createListing };
