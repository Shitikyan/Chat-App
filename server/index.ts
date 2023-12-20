import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import socket from 'socket.io';
import { Server } from "socket.io";
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { messageRoutes } from './routes/messages';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}as any;

mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => {
    console.log('DB Connetion Successfull');
  })
  .catch(err => {
    console.log(err.message);
  });

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`),
);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', socket => {
  global.chatSocket = socket;
  socket.on('add-user', userId => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', data => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});
