import { Injectable, OnInit } from '@angular/core';
import { User } from './../../entity/user';
import { Http } from '@angular/http';
import { NotificationService } from './../notification/notification.service';

@Injectable()
export class UserService implements OnInit {

  me: User;

  constructor(private http: Http, private notifications: NotificationService) { }

  ngOnInit() {
    this.refreshMe();
  }

  setMe(user: User) {
    this.me = user;
  }

  refreshMe() {
    this.http.get('/api/v1/me')
    .subscribe(
      response => this.me = User.fromObject(response.json().payload),
      err => {
        this.notifications.addNotification("alert-danger", err.message || err);
        return Promise.resolve();
      });
  }

  logout() {
    this.http.post('/api/v1/logout', null)
      .subscribe(
      response => this.me = null,
      err => {
        this.notifications.addNotification("alert-danger", err.message || err);
        return Promise.resolve();
      },
      () => this.me = null);
  }
}
