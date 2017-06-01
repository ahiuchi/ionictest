import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from './User';

/*
  Generated class for the GithubUsersServise provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsersServise {

  constructor(public http: Http) {
    //console.log('Hello GithubUsersServise Provider');
  }
  getUsers(url:string): Observable<User[]>{
    return this.http.get(url).map(res => <Array<User>>res.json());
  }
}
