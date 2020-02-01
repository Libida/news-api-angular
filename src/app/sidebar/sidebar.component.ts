import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dropdownItems;
  createdByMeIsChecked;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getSources().subscribe(sources => this.dropdownItems = sources);

    this.appService.createdByMeChange.subscribe(value => {
      this.createdByMeIsChecked = value;
    });
  }

  onCheckboxChange() {
    this.appService.toggleCreatedByMe();
  }

}
