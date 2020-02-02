import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onCancel() {
    window.history.back();
  }

}
