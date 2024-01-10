import env from './constants/env';

export const loginRoute = `${env.baseUrl}/api/auth/login`;
export const registerRoute = `${env.baseUrl}/api/auth/register`;
export const logoutRoute = `${env.baseUrl}/api/auth/logout`;
export const allUsersRoute = `${env.baseUrl}/api/auth/allusers`;
export const sendMessageRoute = `${env.baseUrl}/api/messages/addmsg`;
export const recieveMessageRoute = `${env.baseUrl}/api/messages/getmsg`;
export const setAvatarRoute = `${env.baseUrl}/api/auth/setavatar`;
