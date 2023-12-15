import { SET_AUTHENTICATION } from "src/action-types/auth-action-types";

const initialState = false;

const isAuthenticated = (state = initialState, action: {type: string, payload: boolean}) =>{
  switch(action.type){
    case SET_AUTHENTICATION:
      return state = action.payload;

     default:
      return state; 
  }
}

export default isAuthenticated;
