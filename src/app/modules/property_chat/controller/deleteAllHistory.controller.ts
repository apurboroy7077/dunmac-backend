import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest } from '../../../../helpers/getUserDataFromRequest.helper';
import { conversationModel } from '../model/conversation.model';
import { chatHistoryModel } from '../model/chatHistory.model';

export const deleteAllHistoryController = myControllerHandler(
  async (req, res) => {
    const userData: any = await getUserDataFromRequest(req);
    const { id } = userData;
    const conversationData = await conversationModel.find({
      userId: id,
    });
    const arrayOfConversationId = [];
    for (let i = 0; i < conversationData.length; i++) {
      const singleData = conversationData[i];
      arrayOfConversationId.push(singleData.id);
    }
    const chatDataNumber = await chatHistoryModel.countDocuments({
      conversationId: { $in: arrayOfConversationId },
    });
    // Delete all chat history linked to these conversations
    await chatHistoryModel.deleteMany({
      conversationId: { $in: arrayOfConversationId },
    });
    // Delete all the history
    await conversationModel.deleteMany({ userId: id });

    const myResponse = {
      message: `${chatDataNumber} chat messages have been successfully deleted.`,
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
