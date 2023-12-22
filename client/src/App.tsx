import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterProvider } from './services/register/registerContext';
import { ChatProvider } from './services/chat/chatContext';
import { LoginProvider } from './services/login/loginContext';
import SetAvatar from './components/SetAvatar/SetAvatar';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { SetAvatarProvider } from './services/setAvatar/setAvatarContext';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <RegisterProvider>
              {' '}
              <Register />
            </RegisterProvider>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProvider>
              <Login />
            </LoginProvider>
          }
        />
        <Route
          path="/setAvatar"
          element={
            <SetAvatarProvider>
              <SetAvatar />
            </SetAvatarProvider>
          }
        />
        <Route
          path="/"
          element={
            <ChatProvider>
              <Chat />
            </ChatProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
