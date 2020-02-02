import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() value = '';
  @Input() name: string;
  @Input() id: string;
  @Input() type = 'text';

  constructor() { }

  ngOnInit() {
  }

}
