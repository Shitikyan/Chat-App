import axios from "axios";
import {
  USER_ENTERS_ROOM,
  USER_LEAVES_ROOM,
} from "src/action-types/usersInRoom-action-type";

export const setUsersInRoom = async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4001/", {
      headers: {
        token: localStorage.token,
      },
    });

    const parseResponse = await response.json();

    const user = parseResponse.username;
    return dispatch({ type: USER_ENTERS_ROOM, payload: user });
  } catch (error) {
    console.error(error.message);
  }
};

export const removeUserFromRoom = async (dispatch) => {
  try {
    const response = await axios
      .get("http://localhost:4001/", {
        header: {
          token: localStorage.token,
        },
      })
      

    const parseResponse = await response.json();

    const user = parseResponse.username;

    return dispatch({ type: USER_LEAVES_ROOM, payload: user });
  } catch (error) {
    console.error(error.message);
  }
};
