import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const rootReducers = combineReducers({
  counter: counterReducer,
});

export default rootReducers;
