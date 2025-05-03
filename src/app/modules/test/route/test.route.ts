import express from 'express';
import { testController } from '../controller/test.controller';
import { makeDummyUserController } from '../controller/generateDummyUser.controller';
import { getPropertyDataFromZooplaController } from '../controller/getPropertyDataFromZoopla.controller';
import { getPropertyDataFromZooplaController3 } from '../controller/getPropertyDataFromZoopla3.controller';

const testRouter = express.Router();

testRouter.post('/', testController);
testRouter.get('/create-dummy-user', makeDummyUserController);
testRouter.post(
  '/get-property-data-from-zoopla',
  getPropertyDataFromZooplaController
);
testRouter.post(
  '/get-property-data-from-zoopla-3',
  getPropertyDataFromZooplaController3
);

export { testRouter };
