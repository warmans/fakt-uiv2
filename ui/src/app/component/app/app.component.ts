import { Component } from '@angular/core';
import { UserService } from './../../service/user/user.service';
import { User } from './../../entity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userService: UserService) { }

  me: User

  ngOnInit() {
    this.userService.getMe().then(me => this.me = me)
  }

}
