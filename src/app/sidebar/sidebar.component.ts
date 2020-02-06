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
  isDropdownDisabled = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    // this.appService.getSources().subscribe(sources => this.dropdownItems = sources);
    this.appService.getSources()
      .subscribe((data) => {
        this.dropdownItems = data.sources;
      });

    this.appService.createdByMeChange.subscribe(value => {
      this.createdByMeIsChecked = value;
      this.isDropdownDisabled = value;
      // can't make quickly via setSource as dropdown items are not in the DOM
      const valueForService = value ? 'Local' : undefined;
      this.appService.setSource(valueForService);
    });
  }

  onCheckboxChange() {
    this.appService.toggleCreatedByMe();
  }

}
