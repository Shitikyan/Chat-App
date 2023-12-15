import { CHANGE_NEW_MESSAGE } from "src/action-types/message-action-types";

export const setNewMessage = (
  dispatch: ({ type, payload }: { type: string; payload: boolean }) => void,
  boolean: boolean
) => {
  return dispatch({ type: CHANGE_NEW_MESSAGE, payload: boolean });
};
