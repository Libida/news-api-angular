import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AppService} from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dropdownItems;
  selectedDropdownItem;
  createdByMeIsChecked;
  isDropdownDisabled = false;
  filterForm;

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      query: ''
    });
  }

  ngOnInit() {
    this.appService.getSources().subscribe((data) => {
        this.dropdownItems = data;
      });

    this.appService.sourceChange.subscribe((data) => {
      this.selectedDropdownItem = data.name;
    });

    this.appService.createdByMeChange.subscribe(value => {
      this.createdByMeIsChecked = value;
      this.isDropdownDisabled = value;
      if (value) {
        this.appService.setSourceToLocal();
      } else {
        alert('TODO');
      }
    });
  }

  changeSourceValue(value: string): void {
    this.appService.setSource(value);
  }

  onCheckboxChange() {
    this.appService.toggleCreatedByMe();
  }

  onFilter(data) {
    this.appService.setFilterQuery(data.query);
  }
}