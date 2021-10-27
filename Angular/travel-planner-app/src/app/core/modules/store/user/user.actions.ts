import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/user/models/user.model';

export const login = createAction('Login', props<User>());

export const loginSuccess = createAction('Login success');

export const register = createAction('Register', props<User>());

export const updateAccount = createAction('Update account', props<User>());

export const updateAccountSuccess = createAction('Update account success');

export const logout = createAction('Logout');

export const logoutSuccess = createAction('Logout success');

export const deleteAccount = createAction('Delete account');

