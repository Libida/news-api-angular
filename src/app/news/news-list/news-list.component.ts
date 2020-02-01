import { Component, OnInit } from '@angular/core';
import {ARTICLES} from '../news-mock';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit {
  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }

}
