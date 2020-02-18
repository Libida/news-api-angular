import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {UserFormComponent} from '../user-form/user-form.component';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  @Component({
    selector: 'app-user-form',
    template: '<p>Mock News Form Component</p>'
  })
  class MockUserFormComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, MockUserFormComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
