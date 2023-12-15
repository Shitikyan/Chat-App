import { CHANGE_LAST_NAME } from "../../action-types/registration-action-types";

export const setLastName = (
  dispatch: ({ type, payload }: { type: string; payload: string }) => void,
  lastName: string
) => {
  return dispatch({ type: CHANGE_LAST_NAME, payload: lastName });
};
