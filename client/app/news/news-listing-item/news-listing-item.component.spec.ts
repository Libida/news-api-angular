import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListingItemComponent } from './news-listing-item.component';

describe('NewsListingItemComponent', () => {
  let component: NewsListingItemComponent;
  let fixture: ComponentFixture<NewsListingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
