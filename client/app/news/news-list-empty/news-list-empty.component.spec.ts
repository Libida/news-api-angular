import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListEmptyComponent } from './news-list-empty.component';

describe('NewsListEmptyComponent', () => {
  let component: NewsListEmptyComponent;
  let fixture: ComponentFixture<NewsListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
