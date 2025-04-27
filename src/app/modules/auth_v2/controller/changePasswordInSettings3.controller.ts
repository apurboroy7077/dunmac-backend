import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest } from '../../../../helpers/getUserDataFromRequest.helper';
import {
  checkMyPassword,
  hashMyPassword,
} from '../../../../helpers/passwordHashing';
import { userModel } from '../model/user.model';

export const changePasswordInSettingsController3 = myControllerHandler(
  async (req, res) => {
    const userData: any = await getUserDataFromRequest(req);
    const { new_password, old_password } = req.body;
    await checkMyPassword(old_password, userData.passwordHash);
    const newPasswordHash = await hashMyPassword(new_password);
    userData.passwordHash = newPasswordHash;
    await userData.save();
    const updatedUserData = await userModel.findOne({
      id: userData.id,
    });
    const myResponse = {
      message: 'Password updated successfully',
      success: true,
      data: updatedUserData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
