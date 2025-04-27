import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest } from '../../../../helpers/getUserDataFromRequest.helper';

export const getOwnDataWithAuthTokenController = myControllerHandler(
  async (req, res) => {
    const userData: any = await getUserDataFromRequest(req);
    if (!userData) {
      throw new Error('userdata not found with this token');
    }
    const refinedUserData = userData.toObject();
    delete refinedUserData.passwordHash;

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: refinedUserData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
