import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm;
  errorMsgs = [];
  @Output() userFormSubmit = new EventEmitter<object>();

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router
    ) {
    this.userForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.authService.errorMsgsChange.subscribe(data => {
      this.errorMsgs = data;
    });

    this.authService.userChange.subscribe((data) => {
      console.log('before redirect');
      console.dir(data);
      if (data.user._id) {
        this.router.navigate(['/']);
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.userFormSubmit.emit(this.userForm.value);
  }

}


