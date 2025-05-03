import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import {
  ZOOPLA_P_RAPID_API_HOST,
  ZOOPLA_P_RAPID_API_KEY,
  ZOOPLA_P_RAPID_API_URL,
  ZOOPLA_RAPID_API_BASE_URL,
  ZOOPLA_RAPID_API_HOST,
  ZOOPLA_RAPID_API_KEY,
} from '../../../../data/environmentVariables';
import axios from 'axios';

export const getPropertyDataFromZooplaController3 = myControllerHandler(
  async (req, res) => {
    const { location, price_min, price_max, beds_min } = req.body;

    try {
      // Make the request to Zoopla API with the provided parameters
      const response = await axios.get(
        `${ZOOPLA_P_RAPID_API_URL}/properties/v2/list`,
        {
          params: {
            locationValue: location, // Location for the search
            locationIdentifier: location, // Same as location for simplicity
            category: 'residential', // Property category
            furnishedState: 'Any', // Can be modified if you need specific filtering
            sortOrder: 'newest_listings', // Sorting by the newest listings
            page: 1, // You can make this dynamic for pagination if needed
            priceMin: price_min, // Minimum price (from request)
            priceMax: price_max, // Maximum price (from request)
            bedsMin: beds_min, // Minimum number of beds (from request)
          },
          headers: {
            'x-rapidapi-host': ZOOPLA_P_RAPID_API_HOST,
            'x-rapidapi-key': `${ZOOPLA_P_RAPID_API_KEY}`,
          },
        }
      );

      // Extract the listings from the response data
      let propertyData = response.data.data.listings;
      propertyData =
        propertyData && propertyData.regular ? [...propertyData.regular] : [];

      // Send the formatted response to the client
      const myResponse = {
        message: 'Property data fetched successfully',
        success: true,
        data: {
          propertyData,
        },
      };
      res.status(StatusCodes.OK).json(myResponse);
    } catch (error: any) {
      // Handle any errors that occur during the API request
      console.error('Error fetching property data:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching property data',
        success: false,
        error: error.message,
      });
    }
  }
);
