import { USER_SET } from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
  console.log('reducer-User---', action);
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export default reducer;
