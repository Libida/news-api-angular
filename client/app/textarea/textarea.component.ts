import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() label: string;
  @Input() value = '';
  @Input() name: string;
  @Input() id: string;
  @Input() type = 'text';

  constructor() { }

  ngOnInit() {
  }

}
