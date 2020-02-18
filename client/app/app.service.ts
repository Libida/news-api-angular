import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Article} from './news/article';
import {Articles} from './news/articles';
import {Source} from './news/source';
import {Sources} from './news/sources';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private routerPageTitle: object;
  localSourceValue = 'Local';
  userData;
  localSource: Source = {
    id: 'local',
    name: this.localSourceValue,
    description: 'Local source created by me',
    url: 'http://localhost:4200',
    category: 'general',
    language: 'ru',
    country: 'by'
  };
  private source;
  globalSources: Source[];
  allSources: Source[];
  private sourcesLimitAmount = 9;
  private article;
  private articles;
  globalArticles;
  localArticles;
  private articlesPage = 1;
  private articlesPerPage = 5;
  private visibleArticles = 0;
  private totalArticles;
  private createdByMe = false;
  private toLoadMoreArticles = false;
  private filterQuery = '';
  articlesChange: Subject<Article[]> = new Subject<Article[]>();
  localArticlesChange: Subject<Article[]> = new Subject<Article[]>();
  articleChange: Subject<Article> = new Subject<Article>();
  sourceChange: Subject<Source> = new Subject<Source>();
  allSourcesChange: Subject<Source[]> = new Subject<Source[]>();
  createdByMeChange: Subject<boolean> = new Subject<boolean>();
  routerPageTitleChange: Subject<object> = new Subject<object>();
  loadMoreArticlesChange: Subject<boolean> = new Subject<boolean>();
  private newsApiKey = 'a1e2ae38e5ff42f1aa3175998837d6ca';
  private newsApi = 'https://newsapi.org/v2';
  private sourcesUrl = `${this.newsApi}/sources?apiKey=${this.newsApiKey}&limit=5`;
  private articlesUrl = `${this.newsApi}/everything?apiKey=${this.newsApiKey}`;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.getGlobalSources();
    this.userData = this.authService.getUserData();

    if (this.source && this.source.name) {
      this.getArticles();
    }

    this.authService.userChange.subscribe(data => {
      this.userData = data;
      this.updateAllSourcesWithLocal();
    });

    this.sourceChange.subscribe((value) => {
      this.source = value;

      this.getArticles();
    });

    this.getGlobalSources().subscribe((value) => {
      this.globalSources = value;
      this.setInitialAllSources();
    });

    this.articlesChange.subscribe((value) => {
      this.articles = value;
      this.visibleArticles = this.articles.length;
      this.loadMoreArticlesChange.next((this.totalArticles > this.visibleArticles));
    });

    this.articleChange.subscribe((data) => {
        this.article = data;
      }
    );

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

  getCurrentArticles() {
    return this.articles;
  }

  getCurrentLoadMore() {
    return this.toLoadMoreArticles;
  }

  getArticleByParams(params) {
    const articleUrl = this.getArticleUrl(params);

    this.http.get<Articles>(articleUrl).pipe(
      map((data) => {
        const incomeArticles = data.articles || [];
        return incomeArticles && incomeArticles[0];
      })
    ).subscribe(
      (data) => {
        this.articleChange.next(data);
      },
      (error) => {
        this.articleChange.next(null);
      });
  }

  getArticles(isLoadMore = false) {
    if (this.source.name === this.localSourceValue) {
      this.getLocalArticles(); // no time for making load more for local :(
    } else {
      this.getGlobalArticles(isLoadMore);
    }
  }

  getLocalArticles(createdByMe = false) {
    this.http.get<Article[]>('/api/news-articles').pipe(
      map((data) => {
        const outcomeData = [];
        const sessionAuthor = this.authService.getUserEmail();

        data.forEach((item) => {
          item.type = 'local';

          if (createdByMe && item.author === sessionAuthor) {
            outcomeData.push(item);
          } else if (!createdByMe) {
            outcomeData.push(item);
          }
        });

        return outcomeData;
    })
    ).subscribe(
      (data: Article[]) => {
        console.dir(data);
        this.totalArticles = data.length;
        this.articlesChange.next(data);
      },
      (error) => {
        this.articlesChange.next([]);
      });
  }

  getGlobalArticles(isLoadMore = false) {
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

  getArticleUrl(params) {
    const title = params.get('title');
    const source = params.get('source');
    return `${this.articlesUrl}&sources=${source}&qInTitle="${title}"`;
  }

  getAllSources() {
    return this.globalSources;
  }

  getSelectedSource() {
    return this.source;
  }

  getGlobalSources(): Observable<Source[]> {
    return this.http.get<Sources>(this.sourcesUrl).pipe(
      map((data) => {
        const incomeSources = data.sources || [];
        const outcomeSources = incomeSources.slice(0, this.sourcesLimitAmount);

        return outcomeSources;
      })
    );
  }

  setInitialAllSources() {
    this.allSources = this.globalSources;
    this.updateAllSourcesWithLocal();
  }

  getSourcesListString(): string {
    let result = '';
    const sourceBase = [this.source];

    sourceBase.forEach((source) => {
      result += `${source.id},`;
    });

    return result;
  }

  deleteLocalArticle(articleId) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        newsArticleId: articleId
      },
    };

    this.http.delete<Article>(`/api/news-articles/delete`, options).subscribe(
      (data: Article) => {
        this.getLocalArticles();
        // this.articleChange.next(data);
        this.router.navigate(['/']);
      },
      (error) => {
        // this.localArticleChange.next(null);
      });
  }

  toggleCreatedByMe() {
    this.createdByMeChange.next(!this.createdByMe);
  }

  updateAllSourcesWithLocal() {
    const userEmail = this.authService.getUserEmail();

    if (userEmail) {
      this.localSource.url = userEmail;
      this.allSources.push(this.localSource);
    } else {
      this.allSources.splice(-1, 1);
    }

    this.allSourcesChange.next(this.allSources);

    // Make first source value selected (if nothing is specified (e.g. on init), in case of change of user)
    this.setSource();
  }

  getSource(): Observable<Source> {
    return of(this.source);
  }

  setSource(value: string = this.allSources[0].name) {
    let source;

    for (const sourceItem of this.allSources) {
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

  setSourceToFirst() {
    this.setSource();
  }

  filterLocalArticles() {

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
