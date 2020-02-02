import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  selectedText = 'Select Source';
  @Input() dropdownItems;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  // TODO: dropdown should now nothing about source, should be on one level higher
  onClick(value: string): void {
    this.selectedText = value;
    this.appService.setSource(value);
  }

}
