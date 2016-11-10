import { Component } from '@angular/core';
import { UserService } from './../../service/user/user.service';
import { User } from './../../entity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  me: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.refreshMe();
  }

  logout() {
    this.userService.logout();
  }
}
