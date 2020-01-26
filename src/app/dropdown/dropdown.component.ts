import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  dropdownItems = [{text: "BBC"}, {text: "Heroku"}];

  constructor() { }

  ngOnInit() {
  }

}
