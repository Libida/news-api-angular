import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../article';
import {AuthService} from './../../auth/auth.service';
import {NewsService} from '../news.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-news-listing-item',
  templateUrl: './news-listing-item.component.html',
  styleUrls: ['./news-listing-item.component.scss']
})
export class NewsListingItemComponent implements OnInit {
  @Input() article: Article;
  isLocalArticle;
  user;

  constructor(private authService: AuthService, private appService: AppService) { }

  ngOnInit() {
    this.checkIfLocalArticle();

    this.authService.userChange.subscribe(data => {
      this.checkIfLocalArticle();
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
