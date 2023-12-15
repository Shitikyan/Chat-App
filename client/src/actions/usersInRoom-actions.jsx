import axios from "axios";
import {
  USER_ENTERS_ROOM,
  USER_LEAVES_ROOM,
} from "src/action-types/usersInRoom-action-type";

export const setUsersInRoom = async (dispatch) => {
  try {
    const response = await axios
      .get("http://localhost:3000/", {
        headers: {
          token: localStorage.token,
        },
      })
      .json();

    const user = response.username;
    return dispatch({ type: USER_ENTERS_ROOM, payload: user });
  } catch (error) {
    console.error(error.message);
  }
};

export const removeUserFromRoom = async (dispatch) => {
  try {
    const response = await axios
      .get("http://localhost:3000/", {
        header: {
          token: localStorage.token,
        },
      })
      .json();

    const user = response.username;

    return dispatch({ type: USER_LEAVES_ROOM, payload: user });
  } catch (error) {
    console.error(error.message);
  }
};
