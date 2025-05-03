import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import {
  ZOOPLA_RAPID_API_BASE_URL,
  ZOOPLA_RAPID_API_HOST,
  ZOOPLA_RAPID_API_KEY,
} from '../../../../data/environmentVariables';
import axios from 'axios';

export const getPropertyDataFromZooplaController = myControllerHandler(
  async (req, res) => {
    const { location, price_min, price_max, beds_min } = req.body;
    const response = await axios.get(
      `${ZOOPLA_RAPID_API_BASE_URL}/properties/search-sale`,
      {
        params: {
          geoIdentifier: location,
          geoLabel: location,
          beds_min: beds_min,
          priceMin: 5000000,
          priceMax: 10000000,
        },
        headers: {
          'x-rapidapi-host': ZOOPLA_RAPID_API_HOST,
          'x-rapidapi-key': `${ZOOPLA_RAPID_API_KEY}`,
        },
      }
    );
    let propertyData = response.data.data.listings;
    propertyData = [...propertyData.regular];

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {
        propertyData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
