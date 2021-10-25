import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction('Login success');

export const register = createAction(
  'Register',
  props<{ username: string; password: string }>()
);

export const registerSucces = createAction('Register success');

export const updateAccount = createAction(
  'Update account',
  props<{ newUsername: string; oldPassword: string; newPassword: string }>()
);

export const updateAccountSuccess = createAction('Update account success');

export const logout = createAction('Logout');

export const logoutSuccess = createAction('Logout success');

export const isLoggedIn = createAction('Is logged in');
