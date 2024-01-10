export type ID = number | string;

export interface ApiError {
  statusCode?: number;
  errorMessage?: string;
  success?: boolean;
}

export interface ApiHeaders {
  [key: string]: string;
}

export interface GetAsync {
  statusCode: number;
  statusText?: string;
  data?: { _id: string; username: string; email: string; avatarImage: string };
}

export interface IRegisterService {
  signin(
    url: string,
    signinData: { username: string; email: string; password: string },
  ): Promise<APIResponseRegister>;
}

export interface IChatService {
  getContacts(url: string): Promise<APIResponseChat>;
}

export interface IChatContainerService {
  addMessages(
    url: string,
    values: { from: string; to: string },
  ): Promise<APIResponseChatContainer>;
  sendMessages(
    url: string,
    values: { from: string; to: string; message: string },
  ): Promise<APIResponseChatContainer>;
}

export interface ILoginService {
  signup(
    url: string,
    values: { username: string; password: string },
  ): Promise<APIResponseLogin>;
}

export interface ILogoutService {
  logout(url: string): Promise<APIResponseLogout>;
}

export interface ISetAvatarService {
  getAvatar(url: string): Promise<APIResponseSetAvatar>;
  addAvatar(
    url: string,
    values: { image: string },
  ): Promise<APIResponseSetAvatar>;
}

export interface APIResponse {
  msg: string;
  success: boolean;
}

export interface APIResponseRegister {
  errorMessage?: string;
  statusCode?: number;
  success: boolean;
  data?: {
    user: {
      avatarImage: string;
      email: string;
      isAvatarImageSet: boolean;
      password: string;
      username: string;
      __v: number;
      _id: string;
    };
    success: boolean;
  };
}

export interface APIResponseChat {
  data: {
    avatarImage: string;
    email: string;
    username: string;
    _id: string;
  }[];
}

export interface APIResponseChatContainer {
  data?: {
    fromSelf: boolean;
    message: string;
  }[];
}
[];

export interface APIResponseLogin {
  errorMessage?: string;
  statusCode?: number;
  success?: boolean;
  data?: {
    user: {
      avatarImage: string;
      email: string;
      isAvatarImageSet: boolean;
      password: string;
      username: string;
      __v: number;
      _id: string;
    };
    success: boolean;
  };
}

export interface APIResponseLogout {
  status: number;
}

export interface APIResponseSetAvatar {
  status?: number;
  data?: string;
  statusText?: string;
  isSet?: boolean;
  image?: string;
}

export interface IApiBase<T> {
  getAsync: (url: string) => Promise<GetAsync | ApiError>;

  postAsync: (url: string, values: T) => Promise<T | ApiError>;
}
