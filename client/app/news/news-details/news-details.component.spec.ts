import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailsComponent } from './news-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;

  @Component({
    selector: 'app-spinner',
    template: '<p>Mock Spinner Component</p>'
  })
  class MockSpinnerComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailsComponent, MockSpinnerComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
