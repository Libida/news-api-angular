import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../app.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user;
  routerPageTitle;
  pageTitleDefault = { name: '' };
  pageTitle = this.pageTitleDefault;
  source;
  headerItemsUnauthorised = [{href: 'login', text: 'Login'}, {href: 'sign-up', text: 'Sign up'}];
  headerItemsAuthorised = [{href: 'profile', text: 'Hello'}, {href: 'logout', text: 'Log out'}];
  headerItems = this.headerItemsUnauthorised;

  constructor(
    private appService: AppService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.appService.routerPageTitleChange.subscribe(value => {
      this.useRouterTitleAsPageTitle(value);
    });

    this.appService.getSource().subscribe(source => {
      this.useSourceAsPageTitle(source);
    });

    this.appService.sourceChange.subscribe(source => {
      this.useSourceAsPageTitle(source);
    });

    // TODO: reimplement, first draft
    this.authService.userChange.subscribe(data => {
      if (data.user._id) {
        this.headerItems = this.headerItemsAuthorised;
      } else {
        this.headerItems = this.headerItemsUnauthorised;
      }
    });
  }

  useRouterTitleAsPageTitle(value) {
    this.routerPageTitle = value;

    // Use as a page title only when there is a value
    if (this.routerPageTitle && this.routerPageTitle.name) {
      this.pageTitle = this.routerPageTitle;
    } else if (this.source && this.source.name) {
      this.pageTitle = this.source;
    } else {
      this.pageTitle = this.pageTitleDefault;
    }
  }

  useSourceAsPageTitle(source) {
    // Use source as a page title only when there is no value is router title
    if (!this.routerPageTitle || !this.routerPageTitle.name) {
      this.source = source;
      this.pageTitle = source;
    }
  }

}
