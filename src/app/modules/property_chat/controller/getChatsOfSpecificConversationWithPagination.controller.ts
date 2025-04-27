import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { chatHistoryModel } from '../model/chatHistory.model';

export const getChatsOfSpecificConversationWithPaginationController =
  myControllerHandler(async (req, res) => {
    const { page, limit, conversationId } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);

    const numbersToSkip = (refinedPage - 1) * refinedLimit;
    const chatsData = await chatHistoryModel
      .find({
        conversationId: conversationId,
      })
      .skip(numbersToSkip)
      .limit(refinedLimit);
    const totalNumberOfItems = await chatHistoryModel.countDocuments({
      conversationId: conversationId,
    });
    const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

    const refinedData: any = [];

    for (let i = 0; i < chatsData.length; i++) {
      const singleData = chatsData[i].toObject();
      if (singleData.sender === 'zoopla') {
        singleData.message = JSON.parse(singleData.message);
      }
      refinedData.push(singleData);
    }

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      chatsData: refinedData,
      currentPage: refinedPage,
      totalNumberOfItems: totalNumberOfItems,
      totalNumberOfPages: totalNumberOfPages,
    };
    res.status(StatusCodes.OK).json(myResponse);
  });
