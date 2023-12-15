import { CHANGE_PASSWORD } from "../../action-types/registration-action-types";

export const setPassword = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  password: string
) => {
  return dispatch({ type: CHANGE_PASSWORD, payload: password });
};
