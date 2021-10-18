import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegexProviderService {
  public readonly onlyOneCapitalOneLowercaseLetterAndOneNumber =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

  constructor() {}
}
