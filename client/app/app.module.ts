import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth.guard';
import {NotAuthGuard} from './auth/not-auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
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
import { FileUploadModule } from 'ng2-file-upload';
import { NewsListEmptyComponent } from './news/news-list-empty/news-list-empty.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserFormComponent } from './user-form/user-form.component';

const appRoutes: Routes = [
  {
    path: 'news',
    component: NewsListComponent,
    pathMatch: 'full',
    data: {title: 'News Listing'}
  },
  {
    path: 'article/global/:source/:title',
    component: NewsDetailsComponent,
    data: {title: 'News Details'}
  },
  {
    path: 'article/local/:id',
    component: NewsDetailsComponent,
    data: {title: 'News Details'}
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full',
    data: {title: 'Contact', pageTitle: 'Contact'}
  },
  {
    path: 'add-news',
    component: AddNewsComponent,
    pathMatch: 'full',
    data: {title: 'Add news', pageTitle: 'Add news'},
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-news/:id',
    component: EditNewsComponent,
    pathMatch: 'full',
    data: {title: 'Edit news', pageTitle: 'Edit news'},
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
    pathMatch: 'full',
    data: {title: 'Sign up', pageTitle: 'Sign up'},
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {title: 'Login', pageTitle: 'Login'},
    canActivate: [NotAuthGuard]
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotFoundComponent,
    pathMatch: 'full',
    data: {title: '404', pageTitle: 'Oops'}
  },
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
    NewsListEmptyComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
