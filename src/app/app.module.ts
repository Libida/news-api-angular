import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InputComponent } from './input/input.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  {path: 'news', component: NewsListComponent, pathMatch: 'full'},
  {path: 'contact', component: ContactComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: '404', component: NotFoundComponent, pathMatch: 'full'},
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

export class AppModule {}
