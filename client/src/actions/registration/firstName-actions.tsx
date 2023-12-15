import { CHANGE_FIRST_NAME } from "../../action-types/registration-action-types";

export const setFirstName = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  firstName: string
) => {
  return dispatch({ type: CHANGE_FIRST_NAME, payload: firstName });
};
