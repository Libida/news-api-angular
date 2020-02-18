import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Article} from '../news/article';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  localArticlesUrlBase = '/api/news-articles';
  config = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
  articleWasCreated: Subject<Article> = new Subject<Article>();
  localArticleChange: Subject<Article> = new Subject<Article>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getHttpParamsForArticleChange(value) {
    return new HttpParams()
      .set('author', value.author)
      .set('title', value.title)
      .set('description', value.description)
      .set('content', value.content)
      .set('url', value.url)
      .set('urlToImage', value.urlToImage)
      .set('publishedAt', value.publishedAt)
      .set('type', 'local');
  }

  editLocalArticle(value, articleId) {
    const body = this.getHttpParamsForArticleChange(value);

    this.http.put<Article>(`/api/news-articles/${articleId}`, body, this.config).subscribe(
      (data: Article) => {
        this.localArticleChange.next(data);
      },
      (error) => {
        this.localArticleChange.next(null);
      });
  }

  getLocalArticleByParams(params) {
    const articleId = params.get('id');

    this.http.get<Article>(`/api/news-articles/${articleId}`).subscribe(
      (data: Article) => {
        this.localArticleChange.next(data);
      },
      (error) => {
        this.localArticleChange.next(null);
      });
  }

  addArticle(value) {
    const body = this.getHttpParamsForArticleChange(value);

    this.http.post<Article>(`${this.localArticlesUrlBase}/add`, body, this.config).subscribe((data) => {
      this.articleWasCreated.next(data);
    });
  }

}

