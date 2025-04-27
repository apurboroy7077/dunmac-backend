import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest } from '../../../../helpers/getUserDataFromRequest.helper';
import { conversationModel } from '../model/conversation.model';
import { chatHistoryModel } from '../model/chatHistory.model';

export const getConversationHistoryWithPaginationController =
  myControllerHandler(async (req, res) => {
    const authData = (await getUserDataFromRequest(req)) as any;
    const { id } = authData;
    const { page, limit } = req.query;

    const refinedPage = Number(page);
    const refinedLimit = Number(limit);

    const numbersToSkip = (refinedPage - 1) * refinedLimit;
    const oldConversationsList = await conversationModel
      .find({
        userId: id,
      })
      .sort({
        createdAt: -1,
      });

    const arrayOfIdOfOldConversations: any = [];
    for (let i = 0; i < oldConversationsList.length; i++) {
      const singleConversationList = oldConversationsList[i];
      arrayOfIdOfOldConversations.push(singleConversationList.id);
    }

    const oldestChats: any = [];
    for (let i = 0; i < oldConversationsList.length; i++) {
      const singleConversationData = oldConversationsList[i];
      const oldestData = await chatHistoryModel
        .findOne({
          conversationId: singleConversationData.id,
        })
        .sort({ createdAt: 1 });
      if (oldestData) {
        oldestChats.push(oldestData);
      }
    }

    const refinedData: any = [];
    for (let i = 0; i < oldConversationsList.length; i++) {
      const singleConversationData: any = oldConversationsList[i].toObject();
      for (let i = 0; i < oldestChats.length; i++) {
        const singleChatData = oldestChats[i];
        if (singleConversationData.id === singleChatData.conversationId) {
          singleConversationData.title = singleChatData.message;
          refinedData.push(singleConversationData);
        }
      }
    }

    const totalNumberOfItems = refinedData.length;
    const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

    const paginatedData = refinedData.slice(
      numbersToSkip,
      numbersToSkip + refinedLimit
    );

    const myResponse = {
      message: 'Chat History Retrieved Successfully',
      success: true,
      data: paginatedData,
      currentPage: refinedPage,
      totalNumberOfItems: totalNumberOfItems,
      totalNumberOfPages: totalNumberOfPages,
    };

    res.status(StatusCodes.OK).json(myResponse);
  });
