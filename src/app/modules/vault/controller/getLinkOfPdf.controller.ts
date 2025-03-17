import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAndParseTokenFromHeader2 } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKeyOfVault } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { assetModel } from '../../asset/model/asset.model';
import { getPdfOfImages } from '../../../../helpers/getPdfOfImages';
import { saveAnyFileToFolder } from '../../../../helpers/uploadAnyFileToFolder2';

export const getLinkOfPdfController = myControllerHandler(async (req, res) => {
  const vaultTokenData = await getAndParseTokenFromHeader2(
    req,
    jwtSecretKeyOfVault,
    'vaulttoken'
  );
  const { assetType } = req.body;
  const { email } = vaultTokenData;
  const userData = await userModelOfMantled.findOne({ email });
  if (!userData) {
    throw new Error('user does not exist');
  }
  if (!assetType) {
    throw new Error('please enter asset type');
  }

  const assetsDataOfUser = await assetModel.find({
    ownerId: userData.id,
    type: assetType,
  });

  const documentUrlOfAssets: any = [];
  for (let i = 0; i < assetsDataOfUser.length; i++) {
    const singleAssetData = assetsDataOfUser[i];
    const documentImageUrl = singleAssetData.assetDocumentUrl;
    if (documentImageUrl) {
      documentUrlOfAssets.push(documentImageUrl);
    }
  }

  const pdfOfAllAssetDocument = await getPdfOfImages(documentUrlOfAssets);

  const pdfLink = await saveAnyFileToFolder(
    pdfOfAllAssetDocument,
    './public/pdf/'
  );

  res.status(200).json({ pdfLink });

  // Send the PDF buffer as the response
  res.send(pdfOfAllAssetDocument);
});
