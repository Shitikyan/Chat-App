import { CHANGE_FIRST_NAME } from '../../action-types/registration-action-types'

const initialState = "";

const firstName = (state = initialState, action: {type: string, payload: string}) => {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return state = action.payload;

    default:
      return state;
  }
}

export default firstName;