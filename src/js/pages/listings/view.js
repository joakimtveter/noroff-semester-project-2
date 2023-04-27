import {getValueFromURLParameter, showToast, createHtmlElement} from '../../utils'
import { getListingById } from '../../api';

// Select DOM elemants
const title = document.getElementById('title');
const description = document.getElementById('description');
const currentBidP = document.querySelector('p.current-bid');
const currentBid = document.getElementById('current-bid');
const thumbnails = document.getElementById('thumbnails');
const mainImage = document.getElementById('main-image');
const bidForm = document.getElementById('bid-form');
const bidInput = document.getElementById('bid-input');
const imageContainer = document.getElementById('image-container');

//  Fetch data and render page
try {
    const id = getValueFromURLParameter('id');
    const data = await getListingById(id);
    console.log(data);

    const images = data.media;

    title.innerText = data.title;
    description.innerText = data.description;
    currentBid.innerText = data.currentBid;
    const highestBid = data.bids.reduce((highest, bid) => {
        return bid.amount > highest ? bid.amount : highest;
    }, 0);

    currentBid.innerText = highestBid;
    bidInput.min = highestBid + 1;
    bidInput.value = highestBid + 1;
    mainImage.src = images[0];

    images.forEach(image => {
        const img = createHtmlElement('img', 'thumbnail', null, {src: image});
        img.addEventListener('click', () => {
            mainImage.src = image;
        });
        thumbnails.appendChild(img);
    });
    document.title = data.title + ' for sale | The Auction House';
    imageContainer.style.visibility = 'visible';
    currentBidP.style.visibility = 'visible';
    bidForm.style.visibility = 'visible';
} catch (error) {
    console.error(error);
    showToast(error, 'error');
}
