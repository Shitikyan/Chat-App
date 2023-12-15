import { CHANGE_EMAIL } from '../../action-types/registration-action-types'

const initialState = "";

const email = (state = initialState, action: {type: string, payload: string}) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state = action.payload;

    default:
      return state;
  }
}

export default email;