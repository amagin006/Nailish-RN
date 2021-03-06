import {
  CREATE_USER,
  CREATE_USER_FAILED,
  LOGIN_SUCCESS,
  LOADING_LOGIN,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  FAILED_CONFIRM,
} from '../actions/actionTypes';

const initialState = {
  isLogin: false,
  isLoadingLogin: false,
  isCreateFailed: false,
};

const reducer = (state = initialState, action) => {
  console.log('auth--reducer: ', action.payload);
  switch (action.type) {
    case CREATE_USER:
      // console.log('CREATE_USER--Reducer', action);
      return {
        ...state,
        isLogin: true,
        isLoadingLogin: false,
      };
    case CREATE_USER_FAILED:
      // console.log('CREATE_USER_FAILED', action.payload);
      return {
        ...state,
        isLoadingLogin: false,
        createFailedMessage: action.payload,
      };
    case FAILED_CONFIRM:
      return {
        ...state,
        createFailedMessage: '',
        loginFailedMessage: '',
      };
    case LOGIN_SUCCESS:
      // console.log('LOGIN_SUCCESS', action);
      return {
        ...state,
        isLogin: true,
        isLoadingLogin: false,
      };
    case LOGIN_FAILED:
      // console.log('LOGIN_FAILED', action);
      return {
        ...state,
        isLoadingLogin: false,
        loginFailedMessage: 'Login failed',
      };
    case LOGOUT_SUCCESS:
      // console.log('LOGOUT_SUCCESS');
      return {
        isLogin: false,
      };
    case LOADING_LOGIN:
      // console.log('LOADING_LOGIN');
      return {
        ...state,
        isLoadingLogin: true,
      };
    default:
      return state;
  }
};

export default reducer;
