import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorMessageProviderService {
  public readonly usernameErrorMessages: Record<string, string> = {
    required: 'Username is required',
  };
  public readonly passwordErrorMessages: Record<string, string> = {
    required: 'Password is required',
    minlength: 'Password is at least 8 characters long',
    pattern:
      'Password needs at least one number, one capital and one lowercase letter',
  };

  public readonly tripBudgetErrorMessages: Record<string, string> = {
    required: 'Trip budget is required',
    min: 'Trip budget needs to be greater than 0',
  };

  constructor() {}
}
