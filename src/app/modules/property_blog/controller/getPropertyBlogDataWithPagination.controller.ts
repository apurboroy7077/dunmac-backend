import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { propertyBlogModel } from '../model/propertyBlog.model';

export const getPropertyBlogDataWithPaginationController = myControllerHandler(
  async (req, res) => {
    const { page, limit } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);

    const numbersToSkip = (refinedPage - 1) * refinedLimit;
    const propertyBlogsData = await propertyBlogModel
      .find({})
      .skip(numbersToSkip)
      .limit(refinedLimit);
    const totalNumberOfItems = await propertyBlogModel.countDocuments({});
    const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

    const refinedData: any = [];

    for (let i = 0; i < propertyBlogsData.length; i++) {
      const singleData = propertyBlogsData[i].toObject();
      refinedData.push(singleData);
    }

    const myResponse = {
      message: 'Property Blog Data Retrieved Successfully',
      success: true,
      data: refinedData,
      currentPage: refinedPage,
      totalNumberOfItems: totalNumberOfItems,
      totalNumberOfPages: totalNumberOfPages,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
