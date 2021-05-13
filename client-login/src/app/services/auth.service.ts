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

  getDynamicUrl = (url: string, token?: any) => {
    // console.log('getDynamicUrl: ', token);
    // console.log('this.token: ', this.token);

    this.reqInterceptor.setRequestToken(token && token.length ? token : token && this.token ? this.token : '');

    return this.httpClient.get(url)
      .toPromise<any>()
      .then(data => {
        let rtn: any;
        rtn = data;
        return rtn;
      })
      .catch(err => {
        throw err && err.error ? err.error : err;
      });
  }

  postDynamicJson(url: string, json_data: Object, token?: any) {
    // console.log('postDynamicJson: ', token);
    // console.log(token && token.length);
    // console.log("this.token: ", this.token);
    // console.log(json_data);

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
