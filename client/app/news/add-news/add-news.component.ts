import { Component, OnInit } from '@angular/core';
import {NewsService} from './../news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value) {
    this.newsService.addArticle(value);
  }

}
