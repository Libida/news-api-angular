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
  pageTitle = '';
  article;
  sourceDefaultValue = {name: 'All sources'};
  source = this.sourceDefaultValue;
  sources;
  articles;
  sourceChange: Subject<Source> = new Subject<Source>();

  constructor() {
    this.sourceChange.subscribe((value) => {
      this.source = value;
    });
  }

  getArticles(): Observable<Article[]> {
    this.articles = ARTICLES;
    return of(this.articles);
  }

  getSources(): Observable<Source[]> {
    this.sources = SOURCES;
    return of(this.sources);
  }

  getSource(): Observable<Source> {
    return of(this.source);
  }

  setSource(value: string) {
    const sources = this.sources;
    let source = this.sourceDefaultValue;
    for (const sourceItem of sources) {
      if (sourceItem.name === value) {
        source = sourceItem;
      }
    }
    if (source && source.name) {
      this.sourceChange.next(source);
    }
  }

  setPageTitle(pageTitle: string) {
    this.pageTitle = pageTitle;
  }
}