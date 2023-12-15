import { SET_AUTHENTICATION } from "src/action-types/auth-action-types";

export const setIsAuthenticated = (
  dispatch: ({ type, payload }: { type: string; payload: boolean }) => void,
  boolean: boolean
) => {
  return dispatch({ type: SET_AUTHENTICATION, payload: boolean });
};
