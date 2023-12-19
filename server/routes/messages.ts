import {addMessage,  getMessages} from '../controllers/messageController'
import Router from 'express';

export const messageRoutes = Router()

messageRoutes.post('/addmsg/', addMessage);
messageRoutes.post('/getmsg/', getMessages);

