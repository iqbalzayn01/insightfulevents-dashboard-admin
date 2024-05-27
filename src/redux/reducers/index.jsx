import { combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '../auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
