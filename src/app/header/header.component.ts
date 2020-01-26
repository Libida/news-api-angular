import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  newsSource = 'BBC';
  headerItemsUnauthorised = [{href: "login", text: "Login"}, {href: "signup", text: "Sign up"}];
  headerItemsAuthorised = [{href: "profile", text: "Hello"}, {href: "logout", text: "Log out"}];

  constructor() { }

  ngOnInit() {
  }

}
