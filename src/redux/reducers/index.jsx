import { combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';
import usersReducer from '../users/reducer';
import talentsReducer from '../talents/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  talents: talentsReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
