import express from 'express';
import { propertyChatController } from '../controller/propertyChat.controller';
import { getPropertyDataWithZooplaRapidController } from '../controller/getPropertyDataWithZooplaRapidApi.controller';
import { extractLocationDataFromNLController } from '../controller/extractLocationDataFromNL.controller';
import { propertyChatController2 } from '../controller/propertyChat2.controller';
import { getChatHistoryController } from '../controller/getChatHistory.controller';
import { getChatsOfSpecificConversationController } from '../controller/getChatsOfSpecificConversation.controller';
import { getChatsOfSpecificConversationWithPaginationController } from '../controller/getChatsOfSpecificConversationWithPagination.controller';
import { getConversationHistoryWithPaginationController } from '../controller/getConversationHistoryWithPagination.controller';
import { propertyChatController3 } from '../controller/propertyChat3.controller';
import { deleteAllHistoryController } from '../controller/deleteAllHistory.controller';

const router = express.Router();

router.post('/chat-about-property', propertyChatController);
router.post('/chat-about-property-2', propertyChatController3);
router.post(
  '/get-property-data-with-zoopla-rapid-api',
  getPropertyDataWithZooplaRapidController
);
router.post('/extract-location-from-nl', extractLocationDataFromNLController);
router.get(
  '/get-conversation-history-with-pagination',
  getConversationHistoryWithPaginationController
);
router.get('/get-chat-history', getChatHistoryController);
router.get(
  '/get-chats-of-specific-conversation/:id',
  getChatsOfSpecificConversationController
);
router.get(
  '/get-chats-of-specific-conversation-with-pagination',
  getChatsOfSpecificConversationWithPaginationController
);
router.post('/history/delete/all', deleteAllHistoryController);

export const propertyChatRouter = router;
