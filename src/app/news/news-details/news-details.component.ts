import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ARTICLES} from '../news-mock';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  id;
  article;

  constructor(
    private root: ActivatedRoute
  ) { }

  ngOnInit() {
    this.root.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getArticle();
    });
  }

  getArticle() {
    for (const articleItem of ARTICLES) {
      if (articleItem.title === this.id) {
        this.article = articleItem;
      }
    }
  }

}
