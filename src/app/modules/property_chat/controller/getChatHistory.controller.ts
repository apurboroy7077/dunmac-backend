import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest } from '../../../../helpers/getUserDataFromRequest.helper';
import { conversationModel } from '../model/conversation.model';
import { chatHistoryModel } from '../model/chatHistory.model';

export const getChatHistoryController = myControllerHandler(
  async (req, res) => {
    const authData = (await getUserDataFromRequest(req)) as any;
    const { id } = authData;
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

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: refinedData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
