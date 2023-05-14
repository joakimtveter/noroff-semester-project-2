import { put } from '../put';

async function updateListing(id, requestBody) {
    if (!id) throw new Error('You must supply an id to update a listing.');
    if (!requestBody) throw new Error('You must supply a request body to update a listing.');
    return await put(`/listings/${id}`, requestBody);
}

export { updateListing };
