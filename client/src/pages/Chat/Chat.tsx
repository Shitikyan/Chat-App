import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useChat } from 'src/services/chat/chatContext';
import { ChatContainerProvider } from 'src/services/chatContainer/chatContainerContext';
import { CurrentChatType } from 'src/components/ChatContainer/type';
import Contacts from 'src/components/Contacts/Contacts';
import Welcome from 'src/components/Welcome/Welcome';
import ChatContainer from 'src/components/ChatContainer/ChatContainer';
import env from 'src/utils/constants/env';
import { allUsersRoute } from 'src/utils/APIRoutes';

import { Container } from './styles';

export default function Chat() {
  const navigate = useNavigate();
  const chatService = useChat();
  const socket = useRef<any>();
  const [value] = useLocalStorage(env.localhostKey);
  const [contacts, setContacts] = useState<CurrentChatType[]>([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!value) {
        navigate('/login');
      } else {
        setCurrentUser(value);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(env.baseUrl);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await chatService.getContacts(
            `${allUsersRoute}/${currentUser._id}`,
          );

          setContacts(data);
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat: CurrentChatType) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainerProvider>
              <ChatContainer currentChat={currentChat} socket={socket} />
            </ChatContainerProvider>
          )}
        </div>
      </Container>
    </>
  );
}
