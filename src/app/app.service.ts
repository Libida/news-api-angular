import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ARTICLES} from './news/news-mock';
import {Article} from './news/article';
import {Source} from './news/source';
import {Sources} from './news/sources';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private routerPageTitle: object;
  private article;
  private sourceDefaultName = 'All sources';
  private sourceDefaultValue = {name: this.sourceDefaultName};
  private localSource: Source = {
    id: 'local',
    name: 'Local',
    description: 'Local source created by me',
    url: 'http://localhost:4200',
    category: 'general',
    language: 'ru',
    country: 'by'
  };
  private source = this.sourceDefaultValue;
  private sources: Source[];
  private articles;
  private createdByMe = false;
  sourceChange: Subject<Source> = new Subject<Source>();
  sourcesChange: Subject<object> = new Subject<object>();
  createdByMeChange: Subject<boolean> = new Subject<boolean>();
  routerPageTitleChange: Subject<object> = new Subject<object>();
  private newsApiKey = 'a1e2ae38e5ff42f1aa3175998837d6ca';
  private sourcesUrl = `https://newsapi.org/v2/sources?apiKey=${this.newsApiKey}&limit=5`;
  private newsUrl = `https://newsapi.org/v2/sources?apiKey=${this.newsApiKey}`;

  constructor(private http: HttpClient) {
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

  getSources(): Observable<Sources> {
    return this.http.get<Sources>(this.sourcesUrl).pipe(
      map((data) => {
        const incomeSources = data.sources || [];
        const outcomeSources = incomeSources.slice(0, 9);
        // TODO: add local news only in case of logged in user
        // TODO: populate name for localSource after login
        outcomeSources.push(this.localSource);
        data.sources = outcomeSources;
        this.sources = outcomeSources;
        return data;
      })
    );
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
