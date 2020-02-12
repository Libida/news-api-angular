import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownItems;
  @Input() selectedDropdownItem;
  @Input() isDisabled;
  @Output() dropdownClick = new EventEmitter<string>();

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  onClick(value: string): void {
    this.dropdownClick.emit(value);
  }
}
