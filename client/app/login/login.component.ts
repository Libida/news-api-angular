import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log('Login form submit from child');
    console.dir(value);
  }

}
