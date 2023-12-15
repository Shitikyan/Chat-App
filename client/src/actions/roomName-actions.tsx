import { CHANGE_ROOM_NAME } from "src/action-types/roomName-action-types";

export const setRoomName = (
  dispatch: ({ type, payload }: { type: string; payload: boolean }) => void,
  boolean: boolean
) => {
  return dispatch({ type: CHANGE_ROOM_NAME, payload: boolean });
};
