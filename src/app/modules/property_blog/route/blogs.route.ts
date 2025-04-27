import express from 'express';
import { getPropertyBlogsController } from '../controller/getPropertyBlog.controller';
import { addPropertyBlogController } from '../controller/addPropertyBlog.controller';
import { getLatestPropertyBlogsController } from '../controller/getLatestPropertyBlogs.controller';
import { getSinglePropertyBlogDataController } from '../controller/getSinglePropertyData.controller';
import { updatePropertyBlogController } from '../controller/updatePropertyBlog.controller';
import { getPropertyBlogDataWithPaginationController } from '../controller/getPropertyBlogDataWithPagination.controller';
import { updatePropertyBlogController2 } from '../controller/updatePropertyBlog2.controller';
import { getNumberOfTotalBlogsController } from '../controller/getNumberOfTotalBlog.controller';
import { deletePropertyBlogController } from '../controller/deletePropertyBlog.controller';

const router = express.Router();

router.get('/get-property-blog-data', getPropertyBlogsController);
router.get(
  '/get-property-blog-data-with-pagination',
  getPropertyBlogDataWithPaginationController
);
router.get(
  '/get-single-property-blog-data/:id',
  getSinglePropertyBlogDataController
);
router.post('/get-property-blog-data/latest', getLatestPropertyBlogsController);
router.post('/add-property-blog', addPropertyBlogController);

router.post('/update-property-blog', updatePropertyBlogController);
router.post('/update-property-blog-2', updatePropertyBlogController2);
router.get('/get-number-of-total-blogs', getNumberOfTotalBlogsController);
router.get('/delete-property-blog/:id', deletePropertyBlogController);

export const propertyBlogRouter = router;
