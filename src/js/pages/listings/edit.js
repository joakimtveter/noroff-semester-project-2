import { updateListing, getListingById } from '../../api';
import { getValueFromURLParameter, createHtmlElement, redirect } from '../../utils';

const form = document.getElementById('create-listing-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const tagsInput = document.getElementById('tags');
const mediaInput0 = document.getElementById('media');
const addButton = document.getElementById('add-media-url-button');

const listingId = getValueFromURLParameter('id');
const listing = await getListingById(listingId);

console.log(listing);

titleInput.value = listing.title;
descriptionInput.value = listing.description;
tagsInput.value = listing.tags.join(', ');
mediaInput0.value = listing.media[0];

let mediaInputCount = listing.media.length;
if (mediaInputCount > 0) {
    for (let i = 1; i < mediaInputCount; i++) {
        const mediaInput = createHtmlElement('input', 'media-url-input', null, {
            type: 'url',
            name: `media${i}`,
            value: listing.media[i],
            // 'aria-labeledby': 'Media URL',
        });
        addButton.before(mediaInput);
    }
}

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Add Tag Button Clicked');
    const mediaInput = createHtmlElement('input', 'media-url-input', null, {
        type: 'url',
        name: `media${mediaInputCount}`,
        // 'aria-labeledby': 'Media URL',
    });
    addButton.before(mediaInput);
    mediaInputCount++;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const tags = formData
        .get('tags')
        .split(',')
        .map((tag) => tag.trim());
    const media = [];
    for (let i = 0; i < mediaInputCount; i++) {
        const mediaUrl = formData.get(`media${i}`);
        if (mediaUrl) {
            media.push(mediaUrl);
        }
    }

    const data = {
        title,
        description,
        tags,
        media,
    };

    updateListing(listingId, data);
    redirect(`/listings/single.html?id=${listingId}`, 500);
});
