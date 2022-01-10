import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestInterceptorService } from './request-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(
    private httpClient: HttpClient
    , private reqInterceptor: RequestInterceptorService
  ) { }

  postDynamicJson(url: string, json_data: Object, token?: any) {

    this.reqInterceptor.setRequestToken(token && token.length ? token : token && this.token ? this.token : '');

    return this.httpClient.post(url, json_data)
      .toPromise()
      .then(data => {
        let rtn: any;
        rtn = data;
        return rtn;
      })
      .catch(err => {
        console.log(err);
        throw err && err.error ? err.error : err;
      });
  }
}
