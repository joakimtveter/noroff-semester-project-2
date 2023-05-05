import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

// https://vitejs.dev/config/
export default defineConfig({
    root,
    build: {
        outDir,
        emptyOutDir: true,
        publicDir,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                login: resolve(root, 'auth/login.html'),
                register: resolve(root, 'auth/register.html'),
                listing: resolve(root, 'listing/index.html'),
                editListing: resolve(root, 'listing/edit.html'),
                createListing: resolve(root, 'listing/create.html'),
                profile: resolve(root, 'profile/index.html'),
                editProfile: resolve(root, 'profile/edit.html'),
            },
        },
    },
});
