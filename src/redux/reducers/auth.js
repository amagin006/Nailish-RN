import {
  CREATE_USER,
  LOGIN_SUCCESS,
  LOADING_LOGIN,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  isLoding: false,
  isLoadingLogin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      console.log('CREATE_USER--Reducer', action);
      break;
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS', action);
      return {
        ...state,
        isLogin: true,
        isLoadingLogin: false,
      };
    case LOGIN_FAILED:
      console.log('LOGIN_FAILED', action);
      return {
        ...state,
        isSignInFali: true,
      };
    case LOGOUT_SUCCESS:
      console.log('LOGOUT_SUCCESS');
      return {
        isLogin: false,
      };
    case LOADING_LOGIN:
      console.log('LOADING_LOGIN');
      return {
        ...state,
        isLoadingLogin: true,
      };
    default:
      return state;
  }
};

export default reducer;
