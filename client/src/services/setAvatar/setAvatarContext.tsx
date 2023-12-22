import React, { createContext, useContext } from 'react';
import SetAvatarService from './setAvatar.services';
import { ISetAvatarService } from '../types';

export const SetAvatarContext = createContext<ISetAvatarService | undefined>(
  undefined,
);

interface SetAvatarProviderProps {
  children: React.ReactNode;
}

export const SetAvatarProvider: React.FC<SetAvatarProviderProps> = ({
  children,
}) => {
  const setAvatarService = new SetAvatarService();

  return (
    <SetAvatarContext.Provider value={setAvatarService}>
      {children}
    </SetAvatarContext.Provider>
  );
};

export const usesetAvatar = () => {
  const context = useContext(SetAvatarContext);
  if (!context) {
    throw new Error('usesetAvatar must be used within an SetAvatarProvider');
  }
  return context;
};
