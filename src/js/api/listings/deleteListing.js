import { httpDelete } from '../delete';

async function deleteListing(id) {
    if (!id) throw new Error('You must supply an id to delete a listing.');
    return await httpDelete(`/listings/${id}`);
}

export { deleteListing };
