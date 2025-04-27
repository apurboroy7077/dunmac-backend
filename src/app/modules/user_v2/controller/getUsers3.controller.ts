import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../../auth_v2/model/user.model';

export const getDataOfUsersController3 = myControllerHandler(
  async (req, res) => {
    const { name } = req.query;
    let userData: any;
    if (!name) {
      userData = await userModel.find();
    } else if (name) {
      userData = await userModel.find({
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { email: { $regex: name, $options: 'i' } },
        ],
      });
    }

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: userData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
