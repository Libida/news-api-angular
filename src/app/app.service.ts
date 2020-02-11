import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {ARTICLES} from './news/news-mock';
import {Article} from './news/article';
import {Articles} from './news/articles';
import {Source} from './news/source';
import {Sources} from './news/sources';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private routerPageTitle: object;
  private article;
  allSourceValue = 'All sources';
  localSourceValue = 'Local';
  private localSource: Source = {
    id: 'local',
    name: this.localSourceValue,
    description: 'Local source created by me',
    url: 'http://localhost:4200',
    category: 'general',
    language: 'ru',
    country: 'by'
  };
  private allSource: Source = {
    id: 'all',
    name: this.allSourceValue,
    description: 'All sources',
    url: 'http://localhost:4200',
    category: 'general',
    language: 'ru',
    country: 'by'
  };
  private sourceDefaultName = this.allSourceValue;
  private source;
  private sources = [];
  private sourcesLimitAmount = 9;
  private articles;
  private articlesPage = 1;
  private articlesPerPage = 10;
  private visibleArticles = 0;
  private totalArticles;
  private createdByMe = false;
  private toLoadMoreArticles = false;
  private filterQuery = '';
  articlesChange: Subject<Article[]> = new Subject<Article[]>();
  sourceChange: Subject<Source> = new Subject<Source>();
  createdByMeChange: Subject<boolean> = new Subject<boolean>();
  routerPageTitleChange: Subject<object> = new Subject<object>();
  loadMoreArticlesChange: Subject<boolean> = new Subject<boolean>();
  private newsApiKey = 'a1e2ae38e5ff42f1aa3175998837d6ca';
  private newsApi = 'https://newsapi.org/v2';
  private sourcesUrl = `${this.newsApi}/sources?apiKey=${this.newsApiKey}&limit=5`;
  private articlesUrl = `${this.newsApi}/everything?apiKey=${this.newsApiKey}`;

  constructor(private http: HttpClient) {
    this.getSources();

    this.sourceChange.subscribe((value) => {
      this.source = value;
      this.getArticles();
    });

    this.getSources().subscribe((value) => {
      this.sources = value;

      // Make default source value if nothing is specified (e.g. on init)
      if (!this.source) {
        this.setSource();
      }
    });

    this.articlesChange.subscribe((value) => {
      this.articles = value;
      this.visibleArticles = this.articles.length;
      this.loadMoreArticlesChange.next((this.totalArticles > this.visibleArticles));
    });

    this.loadMoreArticlesChange.subscribe((value) => {
      this.toLoadMoreArticles = value;
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

  getArticles(isLoadMore = false) {
    this.articlesPage = isLoadMore ? (this.articlesPage + 1) : this.articlesPage;
    const articlesUrl = this.getArticlesUrl();

    this.http.get<Articles>(articlesUrl).pipe(
      map((data) => {
        const incomeArticles = data.articles || [];
        let outcomeArticles = [];
        this.totalArticles = data.totalResults;

        if (isLoadMore) {
          outcomeArticles = this.articles;

          incomeArticles.forEach((article, i) => {
            outcomeArticles.push(article);
          });

        } else {
          outcomeArticles = incomeArticles;
        }
        return outcomeArticles;
      })
    ).subscribe(
      (data) => {
        this.articlesChange.next(data);
      },
      (error) => {
        this.articlesChange.next([]);
      });
  }

  getArticlesUrl() {
    const sourcesList = this.getSourcesListString();
    return `${this.articlesUrl}&sources=${sourcesList}&page=${this.articlesPage}&q=${this.filterQuery}&pageSize=${this.articlesPerPage}`;
  }

  getSources(): Observable<Source[]> {
    return this.http.get<Sources>(this.sourcesUrl).pipe(
      map((data) => {
        const incomeSources = data.sources || [];
        const outcomeSources = incomeSources.slice(0, this.sourcesLimitAmount);
        // TODO: add local news only in case of logged in user
        // TODO: populate name for localSource after login
        outcomeSources.push(this.localSource);
        outcomeSources.unshift(this.allSource);
        this.sources = outcomeSources;
        return outcomeSources;
      })
    );
  }

  getSourcesListString(): string {
    let result = '';
    const sourceBase = (this.source.name !== this.sourceDefaultName) ? [this.source] : this.sources;

    sourceBase.forEach((source) => {
      result += `${source.id},`;
    });

    return result;
  }

  toggleCreatedByMe() {
    this.createdByMeChange.next(!this.createdByMe);
  }

  getSource(): Observable<Source> {
    return of(this.source);
  }

  setSource(value: string = this.sourceDefaultName) {
    const sources = this.sources;
    let source;

    for (const sourceItem of sources) {
      if (sourceItem.name === value) {
        source = sourceItem;
      }
    }

    this.source = source;
    this.sourceChange.next(this.source);
  }

  setSourceToLocal() {
    this.setSource(this.localSourceValue);
  }

  setRouterPageTitle(pageTitle: string) {
    this.routerPageTitle = {name: pageTitle};
    this.routerPageTitleChange.next(this.routerPageTitle);
  }

  setFilterQuery(query) {
    this.filterQuery = query;
    this.getArticles();
  }

  getRouterPageTitle(): Observable<object> {
    return of(this.routerPageTitle);
  }
}
