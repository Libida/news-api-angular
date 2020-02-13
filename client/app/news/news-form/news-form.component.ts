import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';
import {FormControl, FormGroup} from '@angular/forms';
import {Article} from '../article';

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

  public uploader: FileUploader = new FileUploader({
    url: uploadURL,
    itemAlias: 'image'
  });

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.newsForm = new FormGroup({
      authorValue: new FormControl(this.article.author),
      titleValue: new FormControl(this.article.title),
      descriptionValue: new FormControl(this.article.description),
      contentValue: new FormControl(this.article.content),
      urlValue: new FormControl(this.article.url),
      urlToImageValue: new FormControl(this.article.urlToImage),
      dateValue: new FormControl(new Date()),
    });
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
    console.log('news form(child) submit');
    this.newsFormSubmit.emit(this.newsForm.value);
  }

}
