import { createListing } from '../../api/listings/createListing';
import { createHtmlElement, formatDateforDatepicker, redirect } from '../../utils';

const form = document.getElementById('create-listing-form');
const addButton = document.getElementById('add-media-url-button');
const datePicker = document.getElementById('endsAt');

const now = new Date().getTime();

datePicker.min = formatDateforDatepicker(new Date(now + 3600000));
datePicker.value = formatDateforDatepicker(new Date(now + 86400000 * 7));
datePicker.max = formatDateforDatepicker(new Date(now + 86400000 * 30));
let mediaInputCount = 1;

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
    let endsAt = formData.get('endsAt');

    const data = {
        title,
        description,
        tags,
        media,
        endsAt,
    };

    createListing(data);
    redirect('/profile.html', 1000);
});
