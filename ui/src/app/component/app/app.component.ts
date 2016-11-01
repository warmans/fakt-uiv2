import { Component } from '@angular/core';
import { UserService } from './../../service/user/user.service';
import { User } from './../../entity/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userService: UserService) { }

  me: User

  ngOnInit() {
    this.userService.refreshMe()
  }

  logout() {
    this.userService.logout();
  }
}
