export interface CurrentChatType {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
}

export interface MessagesType {
  fromSelf?: boolean;
  message?: string;
}
