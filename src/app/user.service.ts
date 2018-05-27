import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  /*
  * @params {username}
  * @description
  * Get repositories by username
  * */
  getReposByUserName(userName:string): Observable<any> {
    return this.http.get("https://api.github.com/users/"+userName+"/repos").
      map((response) => {
        let res = response.json();
        return _.map(res, 'name');
      });
  }

  /*
  * @params {username, reponme}
  * @description
  * Get languages by repositories name
  * */
  getLanguagesByRepoName(userName:string, repoName:string): Observable<any> {
    return this.http.get("https://api.github.com/repos/"+userName+"/"+repoName+"/languages").
      map((res) => {
        let response = res.json();
        return response;
      })
  }

  /*
  * @params {username}
  * @description
  * get owner's full name
  * */
  getOwnerFullName (userName: string) : Observable<any> {
    return this.http.get("https://api.github.com/users/"+userName).
      map((response) => {
        let res = response.json();
        return res.name;
      })
  }
}
