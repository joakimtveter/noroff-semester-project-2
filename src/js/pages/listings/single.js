import { getValueFromURLParameter, showToast, createHtmlElement } from '../../utils';
import { getListingById } from '../../api';
import { renderSingleListing } from '../../render';

const metaDescription = document.querySelector('meta[name="description"]');
const main = document.getElementById('main-content');
const id = getValueFromURLParameter('id');

//  Fetch data and render page
try {
    const data = await getListingById(id);
    console.log(data);
    main.appendChild(renderSingleListing(data));

    document.title = data.title.toLocaleUpperCase() + ' for sale | The Auction House';
    metaDescription.setAttribute('content', data.description);
} catch (error) {
    console.error(error);
    showToast(error, 'error');
}
