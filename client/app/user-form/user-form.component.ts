import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm;
  @Output() userFormSubmit = new EventEmitter<object>();

  constructor(private location: Location) {
    this.userForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.userFormSubmit.emit(this.userForm.value);
  }

}


