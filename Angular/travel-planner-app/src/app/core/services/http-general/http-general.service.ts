import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpGeneralService {
  private url: string;
  private headers: HttpHeaders;
  constructor(public httpClient: HttpClient) {
    this.url = environment.apiRoute;
    this.headers = new HttpHeaders();
  }

  post<ModelType>(apiRoute: string, body: any): Observable<ModelType> {
    return this.httpClient.post<ModelType>(`${this.url + apiRoute}`, body, {
      headers: this.headers,
      withCredentials: true,
      observe: 'body',
    });
  }

  get<ModelType>(apiRoute: string): Observable<ModelType> {
    return this.httpClient.get<ModelType>(`${this.url + apiRoute}`, {
      headers: this.headers,
      withCredentials: true,
      observe: 'body',
    });
  }

  put<ModelType>(apiRoute: string, body: any): Observable<ModelType> {
    return this.httpClient.put<ModelType>(`${this.url + apiRoute}`, body, {
      headers: this.headers,
      withCredentials: true,
      observe: 'body',
    });
  }

  delete<ModelType>(apiRoute: string): Observable<ModelType> {
    return this.httpClient.delete<ModelType>(`${this.url + apiRoute}`, {
      headers: this.headers,
      withCredentials: true,
      observe: 'body',
    });
  }

  setHttpHeader(name: string, value: string | string[]) {
    this.headers.set(name, value);
  }
}
