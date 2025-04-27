import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { chatHistoryModel } from '../model/chatHistory.model';

export const getChatsOfSpecificConversationController = myControllerHandler(
  async (req, res) => {
    const { id } = req.params;

    const chatsHistory = await chatHistoryModel.find({ conversationId: id });

    if (chatsHistory.length < 1) {
      throw new Error('the conversation id is not valid');
    }

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: chatsHistory,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
