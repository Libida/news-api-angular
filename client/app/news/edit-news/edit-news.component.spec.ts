import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsComponent } from './edit-news.component';
import {Component} from '@angular/core';
import {getGlobalArticle} from '../../__mock/mock-utils';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NewsFormComponent} from '../news-form/news-form.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewsComponent, NewsFormComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsComponent);
    component = fixture.componentInstance;
    component.article = getGlobalArticle();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
