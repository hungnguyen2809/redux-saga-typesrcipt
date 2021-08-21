import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from 'redux/auth/slice';
import cityReducer from 'redux/city/slice';
import dashboardReducer from 'redux/dashboard/slice';
import studentReducer from 'redux/student/slice';
import counterReducer from '../features/counter/counterSlice';

const createRootReducers = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    city: cityReducer,
  });
};

export default createRootReducers;
