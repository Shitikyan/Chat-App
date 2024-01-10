import React, { createContext, useContext } from 'react';
import LoginService from './login.services';
import { ILoginService } from '../types';

export const LoginContext = createContext<ILoginService | undefined>(undefined);

interface LoginProviderProps {
  children: React.ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const loginService = new LoginService();

  return (
    <LoginContext.Provider value={loginService}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within an LoginProvider');
  }
  return context;
};
