import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AppPayload, User } from 'models';
import { AuthState, LoginPayload } from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    action_Login: (state, action: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    action_Login_Success: (state, action: PayloadAction<User>) => {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    action_Login_Failed: (state, action: PayloadAction<any>) => {
      state.logging = false;
    },
    action_Login_Other: (state, action: PayloadAction<AppPayload<LoginPayload>>) => {
      console.log(action);
    },

    action_Logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

//Actions
export const authActions = authSlice.actions;

//Selectors
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
export const isLoggingSelector = (state: RootState) => state.auth.logging;
export const currentUserSelector = (state: RootState) => state.auth.currentUser;

//Reducer
const authReducer = authSlice.reducer;
//**----------*/
export default authReducer;
