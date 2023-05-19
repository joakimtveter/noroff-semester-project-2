import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

// https://vitejs.dev/config/
export default defineConfig({
    root,
    css: {
        postcss: {
            plugins: [
                autoprefixer({}), // add options if needed
            ],
        },
        devSourcemap: true,
    },
    build: {
        outDir,
        emptyOutDir: true,
        publicDir,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                search: resolve(root, 'search.html'),
                login: resolve(root, 'auth/login.html'),
                register: resolve(root, 'auth/register.html'),
                allListings: resolve(root, 'listings/index.html'),
                singleListing: resolve(root, 'listings/single.html'),
                editListing: resolve(root, 'listings/edit.html'),
                createListing: resolve(root, 'listings/create.html'),
                profile: resolve(root, 'profile.html'),
            },
        },
        target: 'esnext',
    },
});
