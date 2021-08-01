import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from 'redux/auth/slice';
import dashboardReducer from 'redux/dashboard/slice';
import counterReducer from '../features/counter/counterSlice';

const createRootReducers = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  });
};

export default createRootReducers;
