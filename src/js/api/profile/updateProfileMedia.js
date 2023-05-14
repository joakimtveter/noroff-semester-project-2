import { put } from '../put';
import { getUserObject } from '../../utils';

async function updateProfileMedia(newAvatar) {
    const user = getUserObject();
    if (!user.name) throw new Error('No username found');
    put(`/profiles/${user.name}/media`, { avatar: newAvatar });
    user.avatar = newAvatar;
    localStorage.setItem('user', JSON.stringify(user));
}

export { updateProfileMedia };
