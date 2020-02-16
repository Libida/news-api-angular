import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';
import {FormControl, FormGroup} from '@angular/forms';
import {Article} from '../article';
import {AuthService} from './../../auth/auth.service';
import {NewsService} from './../news.service';
import {Router} from '@angular/router';

const uploadURL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  @Input() article: Article = {};
  @Output() newsFormSubmit = new EventEmitter<object>();
  isImageURL = true;
  isImageFile = false;
  newsForm;
  localArticleAuthor;

  public uploader: FileUploader = new FileUploader({
    url: uploadURL,
    itemAlias: 'image'
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.localArticleAuthor = this.authService.getUserData().user.email;

    this.newsForm = new FormGroup({
      author: new FormControl(this.article.author || this.localArticleAuthor),
      title: new FormControl(this.article.title),
      description: new FormControl(this.article.description),
      content: new FormControl(this.article.content),
      url: new FormControl(this.article.url ),
      urlToImage: new FormControl(this.article.urlToImage),
      publishedAt: new FormControl(new Date()),
    });

    this.newsService.articleWasCreated.subscribe((data: Article) => {
      console.log('articleWasCreated');
      console.dir(data);
      this.redirectToNewsDetails(data);
    });

    this.newsService.localArticleChange.subscribe((data: Article) => {
      console.log('localArticleChange');
      console.dir(data);
      this.redirectToNewsDetails(data);
    });
  }

  redirectToNewsDetails(data: Article) {
    this.router.navigate(['/article/local', data._id]);
  }

  onCancel() {
    this.location.back();
  }

  switchToImageURL() {
    this.isImageURL = true;
    this.isImageFile = false;
  }

  switchToImageFile() {
    this.isImageURL = false;
    this.isImageFile = true;
  }

  onSubmit() {
    this.newsFormSubmit.emit(this.newsForm.value);
  }
}
