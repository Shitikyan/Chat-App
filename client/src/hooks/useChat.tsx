import { useEffect, useRef, useState } from "react";
import socketIOClient, {Socket } from "socket.io-client";
import { useSelector } from "react-redux";

const JOIN_ROOM = "joinRoom";
const ROOM_INFO = "roomInfo";
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:3000";

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState([]);
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const socketRef:  React.MutableRefObject<Socket | undefined>  = useRef();
  const username = useSelector((state: any) => state.usersInRoom[0]);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.emit(JOIN_ROOM, { username, roomId})

    socketRef.current.on(ROOM_INFO, ({ room, users }) => {
      setLoggedInUsers(users)
    })

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.sendId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage])
    })

    return () => {
      socketRef.current.disconnect();
    }
  }, [username]);

  const sendMessage = (messageBody: any) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      sendName: username
    });
  };

  return {messages, sendMessage, loggedInUsers};
};

export default useChat;
