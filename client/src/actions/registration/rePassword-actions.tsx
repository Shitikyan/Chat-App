import { CHANGE_REPASSWORD } from "../../action-types/registration-action-types";

export const setRePassword = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  rePassword: string
) => {
  return dispatch({ type: CHANGE_REPASSWORD, payload: rePassword });
};
