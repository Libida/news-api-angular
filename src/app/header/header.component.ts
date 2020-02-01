import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  newsSource;

  headerItemsUnauthorised = [{href: "login", text: "Login"}, {href: "signup", text: "Sign up"}];
  headerItemsAuthorised = [{href: "profile", text: "Hello"}, {href: "logout", text: "Log out"}];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getSource().subscribe(source => {
      this.newsSource = source;
    });

    this.appService.sourceChange.subscribe(source => {
      this.newsSource = source;
    });
  }
}
