import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service';
import {NewsService} from './../news.service';
import {Article} from '../article';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
  article: Article;

  constructor(
    private root: ActivatedRoute,
    private appService: AppService,
    private newsService: NewsService
    ) { }

  ngOnInit() {
    this.root.paramMap.subscribe(params => {
      this.newsService.getLocalArticleByParams(params);
    });

    this.newsService.localArticleChange.subscribe((data) => {
      this.article = data;
    });
  }

  onSubmit(value) {
    this.newsService.editLocalArticle(value, this.article._id);
  }

}
