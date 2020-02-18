import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {UserFormComponent} from '../user-form/user-form.component';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  @Component({
    selector: 'app-user-form',
    template: '<p>Mock News Form Component</p>'
  })
  class MockUserFormComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, MockUserFormComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
