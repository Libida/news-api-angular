import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsFormComponent } from './news-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {getGlobalArticle, getUser} from '../../__mock/mock-utils';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewsFormComponent', () => {
  let component: NewsFormComponent;
  let fixture: ComponentFixture<NewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create empty state', () => {
    expect(component).toBeTruthy();
  });

  it('should create filled state', () => {
    component.article = getGlobalArticle();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
