import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service';
import {Article} from '../article';
import {AuthService} from '../../auth/auth.service';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  article: Article;
  isLocalArticle;
  user;

  constructor(
    private root: ActivatedRoute,
    private appService: AppService,
    private newsService: NewsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.userChange.subscribe(data => {
      this.checkIfLocalArticle();
    });

    this.appService.articleChange.subscribe((data) => {
      this.article = data;
    });

    this.newsService.localArticleChange.subscribe((data) => {
      this.article = data || {};
      this.checkIfLocalArticle();
    });

    this.root.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.newsService.getLocalArticleByParams(params);
      } else {
        this.appService.getArticleByParams(params);
      }
    });
  }

  checkIfLocalArticle() {
    this.user = this.authService.getUserEmail();
    this.isLocalArticle = (this.article.author === this.user);
  }

  deleteArticle(articleId) {
    this.appService.deleteLocalArticle(articleId);
  }
}
