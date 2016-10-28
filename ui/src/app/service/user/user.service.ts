import { Injectable } from '@angular/core';
import { User } from './../../entity/user';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private me: User

  getMe(): Promise<User> {

    return this.http.get('/api/v1/me')
      .toPromise()
      .then(function (response) { this.me = User.fromObject(response.json().payload); return this.me })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
