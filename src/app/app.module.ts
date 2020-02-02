import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, RouterModule, Routes, NavigationEnd, Router} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {InputComponent} from './input/input.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NewsListComponent} from './news/news-list/news-list.component';
import {ContactComponent} from './contact/contact.component';
import {NewsDetailsComponent} from './news/news-details/news-details.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { NewsListingItemComponent } from './news/news-listing-item/news-listing-item.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { NewsFormComponent } from './news/news-form/news-form.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { TextareaComponent } from './textarea/textarea.component';

const appRoutes: Routes = [
  {path: 'news', component: NewsListComponent, pathMatch: 'full', data: {title: 'News Listing'}},
  {path: 'article/:id', component: NewsDetailsComponent, data: {title: 'News Details'}},
  {path: 'contact', component: ContactComponent, pathMatch: 'full', data: {title: 'Contact'}},
  {path: 'add-news', component: AddNewsComponent, pathMatch: 'full', data: {title: 'Add news'}},
  {path: 'edit-news/:id', component: EditNewsComponent, pathMatch: 'full', data: {title: 'Edit news'}},
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: '404', component: NotFoundComponent, pathMatch: 'full', data: {title: '404'}},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    SidebarComponent,
    InputComponent,
    FooterComponent,
    NotFoundComponent,
    NewsListComponent,
    ContactComponent,
    NewsDetailsComponent,
    AddNewsComponent,
    NewsListingItemComponent,
    LoadMoreComponent,
    NewsFormComponent,
    EditNewsComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return child.snapshot.data.title;
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data);
      }
    });
  }
}
