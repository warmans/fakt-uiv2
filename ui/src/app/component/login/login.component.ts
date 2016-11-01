import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from './../../service/user/user.service';
import { Http } from '@angular/http';
import { User } from './../../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails: { [key: string]: string }

  constructor(private http: Http, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginDetails = { "username": "", "password": "" }
  }

  submitLogin() {
    this.http.post('/api/v1/login', this.loginDetails)
      .toPromise()
      .then(response => this.userService.setMe(User.fromObject(response.json().payload)))
      .then(response => this.router.navigate(["/browse"]))
      .catch(this.handleError);

  }

  submitRegister() {
    this.http.post('/api/v1/register', this.loginDetails)
      .toPromise()
      .then(response => this.userService.setMe(User.fromObject(response.json().payload)))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
