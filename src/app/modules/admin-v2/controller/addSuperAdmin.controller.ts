import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userDataModelOfWeatherConsumerReport } from '../../user/userModelOfWeatherConsumerReport.model';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { userModel } from '../../auth_v2/model/user.model';

export const addSuperAdminController = myControllerHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const passwordHash = await hashMyPassword(password);

  await userModel.create({
    name,
    email,
    passwordHash,
    role: 'admin',
  });

  const myResponse = {
    message: 'Review Given Successfully',
    success: true,
    data: {},
  };
  res.status(StatusCodes.OK).json(myResponse);
});
