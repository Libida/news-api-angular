import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dropdownItems;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getSources().subscribe(sources => this.dropdownItems = sources);
  }

}
