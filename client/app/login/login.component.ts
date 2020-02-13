import { Component, OnInit } from '@angular/core';
import {AuthService} from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log('Login form submit from child');
    console.dir(value);
    this.authService.login(value);
  }

}
