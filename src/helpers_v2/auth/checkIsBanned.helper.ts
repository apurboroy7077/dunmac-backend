import { userModel } from '../../app/modules/auth_v2/model/user.model';
import { userModelOfMantled } from '../../app/modules/auth_v2/model/userModelOfMantled.model';
import { jwtSecretKey } from '../../data/environmentVariables';
import { getAndParseJwtTokenFromHeader } from '../../helpers/getAndParseBearerTokenFromHeader';
import { getUserDataFromRequest } from '../../helpers/getUserDataFromRequest.helper';

export const checkIsBanned = (userData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userData.isBanned) {
        reject('user is banned');
      } else {
        resolve('user is not banned');
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const checkIsBannedOldBuggy = async (req: any) => {
  try {
    let email = req.body?.email;

    if (!email) {
      const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
      email = authData?.email;
    }

    if (!email) {
      throw new Error('email is required for verification');
    }

    const userData = await userModel.findOne({ email });

    if (!userData) {
      throw new Error('user does not exist');
    }

    if (userData.isBanned) {
      throw new Error('user is banned');
    }

    return ''; // Resolves successfully
  } catch (error: any) {
    console.error('Error in checkIsBanned2:', error.message);
    throw error; // Ensures rejection
  }
};

// export const checkIsBanned2 = (req: any) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let email = req.body?.email;

//       if (!email) {
//         const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
//         email = authData?.email;
//       }

//       if (!email) {
//         // If no email, resolve immediately (user is not logged in)
//         resolve('user is not logged in');
//         return;
//       }

//       const userData = await userModel.findOne({ email });

//       if (!userData) {
//         reject('user does not exist');
//         return;
//       }

//       if (userData.isBanned) {
//         reject('user is banned');
//       } else {
//         resolve('user is not banned');
//       }
//     } catch (error: any) {
//       console.log('Error in checkIsBanned2:', error.message);
//       reject(error);
//     }
//   });
// };
export const checkIsBanned2 = async (req: any) => {
  try {
    // Attempt to get user data
    const userData: any = await getUserDataFromRequest(req);

    // If user data is found and the user is banned, throw an error
    if (userData.isBanned) {
      throw new Error('User is banned');
    }

    // If no issues, implicitly return (user is logged in and not banned)
    return;
  } catch (error: any) {
    // If an error occurs (user not found, or any other error)
    console.log('Error in checkIsBanned2:', error.message);

    // Assume if an error occurs during user data fetching, the user is not logged in
    return null; // Return null to indicate user is not logged in or there's an issue fetching user data

    // If you want to rethrow specific errors (like banned users), you can handle those here
    // For example, if the error message contains something like 'user is banned', throw it explicitly:
    // if (error.message.includes('user is banned')) {
    //   throw new Error('User is banned');
    // }
  }
};
