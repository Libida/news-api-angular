import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MockComponent} from 'ng-mocks';

import { NewsListComponent } from './news-list.component';
import {Component} from '@angular/core';
import {getGlobalArticles} from '../../__mock/mock-utils';
import {NewsListingItemComponent} from '../news-listing-item/news-listing-item.component';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {NewsListEmptyComponent} from '../news-list-empty/news-list-empty.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  @Component({
    selector: 'app-sidebar',
    template: '<p>Mock Sidebar Component</p>'
  })
  class MockSidebarComponent {}

  @Component({
    selector: 'app-news-listing-item',
    template: '<p>Mock News Listing Item Component</p>'
  })
  class MockNewsListingItemComponent {}

  @Component({
    selector: 'app-load-more',
    template: '<p>Mock Load More Component</p>'
  })
  class MockLoadMoreComponent {}

  @Component({
    selector: 'app-spinner',
    template: '<p>Mock Spinner Component</p>'
  })
  class MockSpinnerComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsListComponent,
        MockComponent(SidebarComponent),
        MockComponent(NewsListingItemComponent),
        MockComponent(NewsListEmptyComponent),
        MockLoadMoreComponent,
        MockSpinnerComponent
      ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    component.articles = getGlobalArticles();
    component.toShowLoadMore = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
