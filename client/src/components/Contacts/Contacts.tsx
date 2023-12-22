import React, { useState, useEffect } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Logo from '../../assets/logo.svg';
import env from 'src/utils/constants/env';
import { CurrentChatType } from '../ChatContainer/type';

import { Container } from './styles';

export default function Contacts({
  contacts,
  changeChat,
}: {
  contacts: CurrentChatType[];
  changeChat: (chat: CurrentChatType) => void;
}) {
  const [value] = useLocalStorage(env.localhostKey);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (value) {
        setCurrentUserName(value.username);
        setCurrentUserImage(value.avatarImage);
      }
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index: number, contact: CurrentChatType) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>SereneChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact: CurrentChatType, index: number) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
