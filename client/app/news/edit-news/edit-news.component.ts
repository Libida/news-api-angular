import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service';
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
    private appService: AppService) { }

  ngOnInit() {
    this.root.paramMap.subscribe(params => {
      this.appService.getArticleByParams(params);
    });

    this.appService.articleChange.subscribe((data) => {
      this.article = data;
    });
  }

}
