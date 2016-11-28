import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user/user.service';
import { User } from './../../entity/user';
import { NotificationService } from './../../service/notification/notification.service';
import { LoadingService } from './../../service/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  me: User;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.userService.refreshMe();
  }

  logout() {
    this.userService.logout();
  }
}
