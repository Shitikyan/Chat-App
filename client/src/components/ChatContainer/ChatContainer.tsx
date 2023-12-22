import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useChatContainer } from 'src/services/chatContainer/chatContainerContext';
import { LogoutProvider } from 'src/services/logout/logoutContext';
import Logout from '../Logout/Logout';
import ChatInput from '../ChatInput/ChatInput';
import env from 'src/utils/constants/env';
import { recieveMessageRoute, sendMessageRoute } from 'src/utils/APIRoutes';
import { CurrentChatType } from './type';

import { Container } from './styles';

export default function ChatContainer({
  currentChat,
  socket,
}: {
  currentChat: CurrentChatType;
  socket: any;
}) {
  const chatContainerService = useChatContainer();
  const [value] = useLocalStorage(env.localhostKey);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef<HTMLDivElement>();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await chatContainerService.addMessages(
        recieveMessageRoute,
        {
          from: value._id,
          to: currentChat._id,
        },
      );
      setMessages(data);
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        value._id;
      }
    };

    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: value._id,
      msg,
    });
    await chatContainerService.sendMessages(sendMessageRoute, {
      from: value._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <LogoutProvider>
          <Logout />
        </LogoutProvider>
      </div>
      <div className="chat-messages">
        {messages.map(message => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
