import axios from 'axios';
import {
  ZOOPLA_P_RAPID_API_HOST,
  ZOOPLA_P_RAPID_API_KEY,
  ZOOPLA_P_RAPID_API_URL,
  ZOOPLA_RAPID_API_BASE_URL,
  ZOOPLA_RAPID_API_HOST,
  ZOOPLA_RAPID_API_KEY,
} from '../../data/environmentVariables';

export const zooplaRapidApiAR7 = (geoIdentifier: string, geoLabel: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${ZOOPLA_RAPID_API_BASE_URL}/properties/search-sale`,
        {
          params: {
            geoIdentifier: geoIdentifier,
            geoLabel: geoLabel,
            beds_min: 5,
          },
          headers: {
            'x-rapidapi-host': ZOOPLA_RAPID_API_HOST,
            'x-rapidapi-key': `${ZOOPLA_RAPID_API_KEY}`,
          },
        }
      );
      const propertyData = response.data.data.listings;
      resolve(propertyData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const zooplaRapidApiAR7_2 = (locationData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(locationData);
      const { location, price_min, price_max, beds_min } = locationData;
      const response = await axios.get(
        `${ZOOPLA_RAPID_API_BASE_URL}/properties/search-sale`,
        {
          params: {
            geoIdentifier: location,
            geoLabel: location,
            beds_min: beds_min,
            price_min: price_min,
            price_max: price_max,
          },
          headers: {
            'x-rapidapi-host': ZOOPLA_RAPID_API_HOST,
            'x-rapidapi-key': `${ZOOPLA_RAPID_API_KEY}`,
          },
        }
      );
      let propertyData = response.data.data.listings;
      propertyData = [...propertyData.regular, ...propertyData.featured];

      resolve(propertyData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const zooplaRapidApiAR7_3 = (locationData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(locationData);
      const { location, price_min, price_max, beds_min } = locationData;

      const response = await axios.get(
        `${ZOOPLA_P_RAPID_API_URL}/properties/v2/list`, // The endpoint used in your second example
        {
          params: {
            locationValue: location, // Location for the search
            locationIdentifier: location, // Location identifier for filtering
            category: 'residential', // Property category (e.g., residential)
            furnishedState: 'Any', // Filter by furnished state if necessary
            sortOrder: 'newest_listings', // Sort by newest listings
            page: 1, // Page number, could be dynamic if needed
            priceMin: price_min, // Minimum price from input data
            priceMax: price_max, // Maximum price from input data
            bedsMin: beds_min, // Minimum number of beds from input data
          },
          headers: {
            'x-rapidapi-host': ZOOPLA_P_RAPID_API_HOST,
            'x-rapidapi-key': `${ZOOPLA_P_RAPID_API_KEY}`, // API key for authentication
          },
        }
      );

      // Extract property data
      let propertyData = response.data.data.listings;

      // If available, concatenate regular and featured listings
      propertyData = propertyData
        ? [...propertyData.regular, ...propertyData.featured]
        : [];

      // Resolve with the property data
      resolve(propertyData);
    } catch (error) {
      console.log(error);
      reject(error); // Reject the promise if an error occurs
    }
  });
};
export const zooplaRapidApiAR7_4 = (locationData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(locationData);
      let {
        location,
        price_min,
        price_max,
        beds_min,
        beds_max,
        bathrooms_min,
        bathrooms_max,
        status,
      } = locationData;
      const priceRange = `${price_min ? price_min : ''},${
        price_max ? price_max : ''
      }`;
      const bedsRange = `${beds_min ? beds_min : ''},${
        beds_max ? beds_max : ''
      }`;
      const bathroomsRange = `${bathrooms_min ? bathrooms_min : ''},${
        bathrooms_max ? bathrooms_max : ''
      }`;
      const lastUrl = status === 'for_rent' ? 'rent' : 'sale';
      const response = await axios.get(
        `${ZOOPLA_RAPID_API_BASE_URL}/properties/search-${lastUrl}`, // The endpoint used in your second example
        {
          params: {
            geoIdentifier: location, // Location for the search
            geoLabel: location, // Location identifier for filtering
            priceRange: priceRange,
            bedrooms: bedsRange,
            bathrooms: bathroomsRange,
            // category: 'residential', // Property category (e.g., residential)
            // furnishedState: 'Any', // Filter by furnished state if necessary
            // sortOrder: 'newest_listings', // Sort by newest listings
            // page: 1, // Page number, could be dynamic if needed
            // priceMin: price_min, // Minimum price from input data
            // priceMax: price_max, // Maximum price from input data
            // bedsMin: beds_min, // Minimum number of beds from input data
            // // includeRented: true,
            // listing_status: 'rent',
          },
          headers: {
            'x-rapidapi-host': ZOOPLA_RAPID_API_HOST,
            'x-rapidapi-key': `${ZOOPLA_RAPID_API_KEY}`, // API key for authentication
          },
        }
      );

      // Extract property data
      console.log(response.data.data.analyticsTaxonomy);
      let propertyData = response.data.data.listings;

      // If available, concatenate regular and featured listings
      propertyData = propertyData ? [...propertyData.regular] : [];

      // Resolve with the property data
      // console.log(propertyData);
      resolve(propertyData);
    } catch (error) {
      console.log(error);
      reject(error); // Reject the promise if an error occurs
    }
  });
};
