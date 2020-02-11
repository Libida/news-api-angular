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
