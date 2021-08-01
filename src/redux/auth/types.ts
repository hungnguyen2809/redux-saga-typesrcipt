import { User } from 'models';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

export interface LoginPayload {
  username: string;
  password: string;
}
