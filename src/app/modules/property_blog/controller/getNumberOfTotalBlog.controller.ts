import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { propertyBlogModel } from '../model/propertyBlog.model';

export const getNumberOfTotalBlogsController = myControllerHandler(
  async (req, res) => {
    const totalBlogsNumber = await propertyBlogModel.countDocuments({});
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      totalBlogsNumber,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
