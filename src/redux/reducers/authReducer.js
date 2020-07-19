import {AUTH_USER} from '../actions/type';
const initialState = {
  userAuth: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        userAuth: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
