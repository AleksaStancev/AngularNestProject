import { Injectable } from '@angular/core';
import { HttpGeneralService } from 'src/app/core/services/http-general/http-general.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpGeneralService<any>) {
    console.log(httpService);
  }

  getUser() {
    this.httpService.delete('/a').subscribe((data) => {});
  }
}
