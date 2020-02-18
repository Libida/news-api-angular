import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  @Component({
    selector: 'app-header',
    template: '<p>Mock App Header</p>'
  })
  class MockHeaderComponent {}

  @Component({
    selector: 'app-footer',
    template: '<p>Mock App Footer</p>'
  })
  class MockFooterComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MockHeaderComponent, MockFooterComponent
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
