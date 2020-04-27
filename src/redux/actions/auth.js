import {
  CREATE_USER,
  LOGIN_SUCCESS,
  LOADING_LOGIN,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from './actionTypes';
import * as Google from 'expo-google-app-auth';
import {
  GOOGLE_AUTH_IOS_CLIENT_ID,
  GOOGLE_AUTH_ANDROID_CLIENT_ID,
  GOOGLE_IOS_STANDALONE_CLIENT_ID,
  GOOGLE_ANDROID_STANDALONE_CLIENT_ID,
} from 'react-native-dotenv';

import Firebase, { auth } from '../../config/Firebase';

function loadingLogIn() {
  console.log('loadingLogIn ---- aciton - auth.js');
  return {
    type: LOADING_LOGIN,
  };
}

function loginSuccess() {
  console.log('loginSuccess ---- aciton - auth.js ');
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginFailed(err) {
  console.log('loginFailed ---- aciton - auth.js= payload: ', err);
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
}

function logoutSuccess() {
  console.log('logoutSuccess --- action - auth.js');
  return {
    type: LOGOUT_SUCCESS,
  };
}

export const userLoginWithPass = (email, password) => {
  console.log('userLogin--action.js', email, password);
  return dispatch => {
    dispatch(loadingLogIn());
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login');
        dispatch(loginSuccess());
      })
      .catch(error => {
        console.log('Error signInWithEmailAndPassword: ', error);
        dispatch(loginFailed(error));
      });
  };
};

export const userLogout = () => {
  console.log('userLogout--action.js');
  return dispatch => {
    Firebase.auth()
      .signOut()
      .then(() => {
        console.log('userLogout -- action');
        dispatch(logoutSuccess());
      })
      .catch(error => {
        console.log('userLogout Error: ', error);
      });
  };
};

function createNewUser() {
  console.log('creatNewUser');
  return {
    type: CREATE_USER,
  };
}

export const createUser = (email, password) => {
  console.log('createUser---action.js', email, password);
  return dispatch => {
    dispatch(loadingLogIn());
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(createNewUser());
      })
      .catch(error => {
        console.log('createUser Error: ', error);
      });
  };
};

export const googleLogin = () => {
  console.log('googleLogin -- action.js');
  return dispatch => {
    dispatch(loadingLogIn());
    Google.logInAsync({
      iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
      androidClientId: GOOGLE_AUTH_ANDROID_CLIENT_ID,
      iosStandaloneAppClientId: GOOGLE_IOS_STANDALONE_CLIENT_ID,
      androidStandaloneAppClientId: GOOGLE_ANDROID_STANDALONE_CLIENT_ID,
      scopes: ['profile', 'email'],
    })
      .then(result => {
        if (result.type === 'success') {
          console.log('res----googleLogin', result);
          const { idToken, accessToken } = result;
          const credential = Firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
          try {
            auth.signInWithCredential(credential);
            dispatch(loginSuccess());
          } catch (err) {
            console.log('Google Auth Error: ', err);
          }
        } else {
          console.log('Google Auth is not success - Error_type:', result.type);
        }
      })
      .catch(error => {
        console.log('Google login - Error: ', error);
        dispatch(loginFailed());
      });
  };
};
