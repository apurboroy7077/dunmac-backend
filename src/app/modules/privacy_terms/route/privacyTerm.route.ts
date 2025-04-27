import express from 'express';
import { editPrivacyTermsController } from '../controller/editPrivacyTerm.controller';
import { getPrivacyTermsController } from '../controller/getPrivacyTerms.controller';
import { updatePrivacyTermsController } from '../controller/updatePrivacyTerms.controller';

const router = express.Router();

router.get('/get-privacy-terms', getPrivacyTermsController);
router.post('/edit-privacy-terms', editPrivacyTermsController);
router.post('/update-privacy-terms', editPrivacyTermsController);

export const privacyTermsRouter = router;
//
