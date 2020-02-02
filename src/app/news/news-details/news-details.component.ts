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
  id;
  article: Article;

  constructor(
    private root: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.root.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.article = this.appService.getArticleById(this.id);
    });
  }
}
