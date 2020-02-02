import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {SOURCES} from './news/sources-mock';
import {ARTICLES} from './news/news-mock';
import {Article} from './news/article';
import {Source} from './news/source';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  routerPageTitle: object;
  article;
  sourceDefaultName = 'All sources';
  sourceDefaultValue = {name: this.sourceDefaultName};
  localSource: Source = {
    id: 'local',
    name: 'Local',
    description: 'Local source created by me',
    url: 'http://localhost:4200',
    category: 'general',
    language: 'ru',
    country: 'by'
  };
  source = this.sourceDefaultValue;
  sources;
  articles;
  createdByMe = false;
  sourceChange: Subject<Source> = new Subject<Source>();
  createdByMeChange: Subject<boolean> = new Subject<boolean>();
  routerPageTitleChange: Subject<object> = new Subject<object>();

  constructor() {
    this.sourceChange.subscribe((value) => {
      this.source = value;
    });

    this.createdByMeChange.subscribe((value) => {
      this.createdByMe = value;
    });

    this.routerPageTitleChange.subscribe((value) => {
      this.routerPageTitle = {name: value};
    });
  }

  getArticleById(id): Article {
    for (const articleItem of ARTICLES) {
      if (articleItem.title === id) {
        this.article = articleItem;
      }
    }

    return this.article;
  }

  getArticles(): Observable<Article[]> {
    this.articles = ARTICLES;
    return of(this.articles);
  }

  getSources(): Observable<Source[]> {
    this.sources = SOURCES;
    // TODO: add local news only in case of looged in user
    // TODO: populate name for localSource after login
    this.sources.push(this.localSource);
    return of(this.sources);
  }

  getSource(): Observable<Source> {
    return of(this.source);
  }

  toggleCreatedByMe() {
    this.createdByMeChange.next(!this.createdByMe);
  }

  setSource(value: string = this.sourceDefaultName) {
    const sources = this.sources;
    let source = this.sourceDefaultValue;

    for (const sourceItem of sources) {
      if (sourceItem.name === value) {
        source = sourceItem;
      }
    }

    if (!source || !source.name) {
      source = this.sourceDefaultValue;
    }

    this.source = source;

    this.sourceChange.next(this.source);
  }

  setRouterPageTitle(pageTitle: string) {
    this.routerPageTitle = {name: pageTitle};
    this.routerPageTitleChange.next(this.routerPageTitle);
  }

  getRouterPageTitle(): Observable<object> {
    return of(this.routerPageTitle);
  }
}
