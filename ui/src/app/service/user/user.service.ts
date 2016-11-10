import { Injectable, OnInit } from '@angular/core';
import { User } from './../../entity/user';
import { Http } from '@angular/http';

@Injectable()
export class UserService implements OnInit {

  me: User;

  constructor(private http: Http) { }

  ngOnInit() {
    this.refreshMe();
  }

  setMe(user: User) {
    this.me = user;
  }

  refreshMe() {
    return this.http.get('/api/v1/me')
      .toPromise()
      .then(response => this.me = User.fromObject(response.json().payload))
      .catch(function (error) {
        return Promise.reject(error.message || error);
      });
  }

  logout() {
    this.http.post('/api/v1/logout', null)
      .toPromise()
      .then(response => this.me = null)
      .catch(function (error) {
        return Promise.reject(error.message || error);
      });
  }
}
