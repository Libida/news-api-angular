import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Output() clicked = new EventEmitter<boolean>();
  isLoadMoreVisible = false;

  constructor(private appService: AppService) { }

  ngOnInit() {}

  loadMoreClick() {
    this.clicked.emit(true);
  }

}
