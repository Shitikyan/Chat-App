import React, { createContext, useContext } from 'react';
import RegisterService from './register.service';
import { IRegisterService } from '../types';

export const RegisterContext = createContext<IRegisterService | undefined>(
  undefined,
);

interface RegisterProviderProps {
  children: React.ReactNode;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
}) => {
  const registerService = new RegisterService();

  return (
    <RegisterContext.Provider value={registerService}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister must be used within an RegisterProvider');
  }
  return context;
};
