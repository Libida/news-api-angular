import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../app.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isAuthorised;
  userEmail;
  routerPageTitle;
  pageTitleDefault = { name: '' };
  pageTitle = this.pageTitleDefault;
  source;
  headerItemsUnauthorised = [{text: 'Login', href: 'login'}, {text: 'Sign up', href: 'sign-up'}];
  headerItems;

  constructor(
    private appService: AppService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.updateHeaderItems();
    this.source = this.appService.getSelectedSource();
    this.useSourceAsPageTitle(this.source);

    this.appService.routerPageTitleChange.subscribe(value => {
      this.useRouterTitleAsPageTitle(value);
    });

    this.appService.sourceChange.subscribe(source => {
      this.useSourceAsPageTitle(source);
    });

    this.authService.userChange.subscribe(data => {
      this.updateHeaderItems();
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

  updateHeaderItems() {
    const userEmail = this.authService.getUserEmail();

    if (userEmail) {
      this.isAuthorised = true;
      this.userEmail = userEmail;
    } else {
      this.isAuthorised = false;
      this.userEmail = '';
    }
  }

  logout() {
    this.authService.logout();
  }

}
