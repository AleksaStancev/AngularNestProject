import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  removeNullEntriesFromObject(obj: any) {
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] == null || obj[key] == '') delete obj[key];
    });
  }
}
