import { CHANGE_USERNAME } from "../../action-types/registration-action-types";

export const setUsername = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  username: string
) => {
  return dispatch({ type: CHANGE_USERNAME, payload: username });
};
