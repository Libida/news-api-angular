import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  articles;
  toShowLoadMore;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    // For case when first page load starts on different page
    this.articles = this.appService.getCurrentArticles();
    this.toShowLoadMore = this.appService.getCurrentLoadMore();

    this.appService.articlesChange.subscribe(data => {
      this.articles = data;
    });

    this.appService.loadMoreArticlesChange.subscribe((value) => {
      this.toShowLoadMore = value;
    });
  }

  onLoadMoreClick() {
    this.appService.getArticles(true);
  }
}
