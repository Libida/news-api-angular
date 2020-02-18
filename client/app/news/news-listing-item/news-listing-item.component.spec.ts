import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsListingItemComponent } from './news-listing-item.component';
import {getGlobalArticle, getUser} from '../../__mock/mock-utils';

describe('NewsListingItemComponent', () => {
  let component: NewsListingItemComponent;
  let fixture: ComponentFixture<NewsListingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListingItemComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListingItemComponent);
    component = fixture.componentInstance;
    component.article = getGlobalArticle();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
