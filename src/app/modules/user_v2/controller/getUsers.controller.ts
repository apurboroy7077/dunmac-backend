import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../../auth_v2/model/user.model';

export const getDataOfUsersController2 = myControllerHandler(
  async (req, res) => {
    const { name, email } = req.query;
    let userData: any;
    if (!name && !email) {
      userData = await userModel.find();
    } else if (name) {
      userData = await userModel.find({
        $or: [{ name: { $regex: name ? name : '', $options: 'i' } }],
      });
    } else if (email) {
      userData = await userModel.find({
        $or: [{ email: { $regex: email ? email : '', $options: 'i' } }],
      });
    } else if (name && email) {
      userData = await userModel.find({
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { email: { $regex: email, $options: 'i' } },
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
