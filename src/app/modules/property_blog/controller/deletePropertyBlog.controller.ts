import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { propertyBlogModel } from '../model/propertyBlog.model';

export const deletePropertyBlogController = myControllerHandler(
  async (req, res) => {
    console.log('hello world');
    const { id } = req.params;
    const blog = await propertyBlogModel.findOne({ id });
    if (!blog) {
      throw new Error('blog does not exist with id');
    }
    await blog.deleteOne();
    const myResponse = {
      message: 'blog deleted successfully',
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
