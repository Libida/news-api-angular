import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder} from '@angular/forms';

const uploadURL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  @Input() authorValue = '';
  @Input() titleValue = '';
  @Input() descriptionValue = '';
  @Input() contentValue = '';
  @Input() urlValue = '';
  @Input() urlToImageValue = '';
  dateValue = new Date();
  isImageURL = true;
  isImageFile = false;
  newsForm;

  public uploader: FileUploader = new FileUploader({
    url: uploadURL,
    itemAlias: 'image'
  });

  constructor(
    private location: Location,
    private formBuilder: FormBuilder) {
    this.newsForm = this.formBuilder.group({});
  }

  ngOnInit() {
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

}
