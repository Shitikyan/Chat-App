import { CHANGE_NEW_MESSAGE } from "../action-types/message-action-types";

const initialState = "";

const newMessage = (state = initialState, action: {type: string, payload: string}) => {
  switch (action.type) {
    case CHANGE_NEW_MESSAGE:
      return (state = action.payload);

    default:
      return state;
  }
};

export default newMessage;
