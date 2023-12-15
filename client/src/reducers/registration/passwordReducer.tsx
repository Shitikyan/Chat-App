import { CHANGE_PASSWORD } from '../../action-types/registration-action-types'

const initialState = "";

const password = (state = initialState, action: {type: string, payload: string}) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return state = action.payload;

    default:
      return state;
  }
}

export default password;