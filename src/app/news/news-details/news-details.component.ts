import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service';
import {Article} from '../article';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  source;
  title;
  article: Article;

  constructor(
    private root: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.root.paramMap.subscribe(params => {
      this.source = params.get('source');
      this.title = params.get('title');
      this.appService.getArticleById({
        source: this.source,
        title: this.title
      });
    });

    this.appService.articleChange.subscribe((data) => {
      this.article = data;
    });
  }
}
