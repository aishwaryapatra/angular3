import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileLogin: FormGroup;
  username = new FormControl();
  password = new FormControl();
  submitMessage: string;
  constructor(private auth: AuthenticationService, private routeservice: RouterService) { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(2)]),
      this.password = new FormControl('', [Validators.required]),
      this.profileLogin = new FormGroup({
        username: this.username,
        password: this.password
      });
  }
  loginSubmit() {
    console.log(this.username.value);
    console.log(this.password.value);
    this.auth.authenticateUser(this.profileLogin.value).subscribe(
      data => {
        console.log(data);
        this.auth.setBearerToken(data['token']);
        this.routeservice.routeToDashboard();
      },
      err => {
        console.log(err);
        if (err.status === 404) {
          this.submitMessage = err.message;
        } else {
          this.submitMessage = err.error.message;
        }

      });
  }
}
