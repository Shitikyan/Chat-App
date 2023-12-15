import { CHANGE_REPASSWORD } from '../../action-types/registration-action-types'

const initialState = "";

const rePassword = (state = initialState, action: {type: string, payload: string}) => {
  switch (action.type) {
    case CHANGE_REPASSWORD:
      return state = action.payload;

    default:
      return state;
  }
}

export default rePassword;