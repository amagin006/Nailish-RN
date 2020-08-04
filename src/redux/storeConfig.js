import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import customerReducer from './reducers/customer';

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  customer: customerReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
