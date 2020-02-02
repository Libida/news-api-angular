import { Component, OnInit, Input } from '@angular/core';
import {Article} from '../article';

@Component({
  selector: 'app-news-listing-item',
  templateUrl: './news-listing-item.component.html',
  styleUrls: ['./news-listing-item.component.scss']
})
export class NewsListingItemComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }


}
