import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveTotalAmountOfIncome } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalAmountOfIncome.helper';
import { getAdminRequestAndGiveDataOfIncomesOfDifferentMonths } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveDataOfIncomesOfDifferentMonths.helper';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth/model/userModelDunmac.model';
import { checkIfUserRequestingAdmin2 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const getIncomeOfDifferentMonthsController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin2(req, jwtSecretKey, userModelOfMantled);
    const totalAmountOfEarnings =
      await getAdminRequestAndGiveDataOfIncomesOfDifferentMonths(req);
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      totalEarnings: totalAmountOfEarnings,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
