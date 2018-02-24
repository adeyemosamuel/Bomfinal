import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LandingProvider {

  constructor(public http: Http) {
    console.log('Hello LandingProvider Provider');
  }
  Login(Username, Password) {
    console.log(Username);
    console.log(Password);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      

      if (Username == 'samuel' && Password == 'adeyemo') {
        let res = {
          "error": false,
          "message": "Succesful login"
        };
        resolve(res);
      }else {
        let err = {
          "error": true,
          "message": "Login Failed"
        };
        reject(err);
      }

      //   this.http.post(apiUrl + 'login', JSON.stringify(credentials), { headers: headers })
      //     .subscribe(res => {
      //       resolve(res.json());
      //     }, (err) => {
      //       reject(err);
      //     });
    });
  }
}
