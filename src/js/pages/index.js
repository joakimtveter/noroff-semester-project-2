import { getListings } from '../api';

const listings = await getListings();
console.log(listings);
