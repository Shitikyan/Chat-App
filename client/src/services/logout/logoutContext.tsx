import React, { createContext, useContext } from 'react';
import LogoutService from './logout.services';
import { ILogoutService } from '../types';

export const LogoutContext = createContext<ILogoutService | undefined>(
  undefined,
);

interface LogoutProviderProps {
  children: React.ReactNode;
}

export const LogoutProvider: React.FC<LogoutProviderProps> = ({ children }) => {
  const logoutService = new LogoutService();

  return (
    <LogoutContext.Provider value={logoutService}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within an LogoutProvider');
  }
  return context;
};
