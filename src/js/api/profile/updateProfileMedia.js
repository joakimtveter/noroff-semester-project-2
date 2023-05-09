import { put } from '../put';
import { getUserName } from '../../utils';

async function updateProfileMedia(avatars) {
    const username = getUserName();
    if (!username) throw new Error('No username found');
    put(`/profiles/${username}/media`, { avatar: avatars });
}

export { updateProfileMedia };
