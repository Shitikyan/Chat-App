import { CHANGE_EMAIL } from "src/action-types/registration-action-types";

export const setEmail = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  email: string
) => {
  console.log(email, 'emailemailemail');
  
  return dispatch({ type: CHANGE_EMAIL, payload: email });
};
