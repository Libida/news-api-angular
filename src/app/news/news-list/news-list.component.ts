import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  articles;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.appService.getArticles().subscribe(articles => this.articles = articles);
  }

}
