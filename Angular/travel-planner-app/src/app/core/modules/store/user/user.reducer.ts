import { createReducer, on } from '@ngrx/store';
import * as Actions from './user.actions';

export interface UserLoginState {
  isLoggedIn: boolean;
}

export const initialState: UserLoginState = {
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(Actions.loginSuccess, (state: UserLoginState) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(Actions.registerSucces, (state: UserLoginState) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(Actions.logoutSuccess, (state: UserLoginState) => ({
    ...state,
    isLoggedIn: false,
  }))
);
