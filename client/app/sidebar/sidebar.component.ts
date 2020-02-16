import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AppService} from '../app.service';
import {AuthService} from '../auth/auth.service';

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
  isAuthorised;

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.filterForm = this.formBuilder.group({
      query: ''
    });
  }

  ngOnInit() {
    this.isAuthorised = this.authService.isAuthorized();
    this.dropdownItems = this.appService.getAllSources();
    const selectedSource = this.appService.getSelectedSource();
    this.selectedDropdownItem = selectedSource && selectedSource.name;

    this.authService.userChange.subscribe(data => {
      this.isAuthorised = this.authService.isAuthorized();
    });

    this.appService.allSourcesChange.subscribe((data) => {
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
        this.appService.getLocalArticles(true);
      } else {
        this.appService.setSourceToFirst();
        this.appService.getLocalArticles();
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
