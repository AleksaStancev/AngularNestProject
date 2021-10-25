import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserLoginState } from './user.reducer';

export const selectIsUserLoggedIn = createSelector(
  (state: AppState) => state.userLogin,
  (userLogin: UserLoginState) => userLogin.isLoggedIn
);
