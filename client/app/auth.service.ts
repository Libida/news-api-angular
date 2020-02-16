import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails: User;
  config = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
  errorMsgsChange: Subject<string[]> = new Subject<string[]>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.userChange.subscribe(data => {
      this.userDetails = data;
    });
  }

  login(value) {
    this.auth('/api/login', value);
  }

  register(value) {
    this.auth('/api/register', value);
  }

  auth(url, value) {
    const body = new HttpParams()
      .set('email', value.login)
      .set('password', value.password);

    this.http.post<User>(url, body, this.config).pipe(
      map((data: User) => {
        const procceedResponse: User = {
          user: {
            email: data && data.user && data.user.local && data.user.local.email,
            _id: data && data.user && data.user._id
          },
          errorMessages: data && data.errorMessages,
          successMessages: data && data.successMessages,
        };

        return procceedResponse;
      })
    ).subscribe((data) => {
      this.errorMsgsChange.next(data.errorMessages);
      this.userChange.next(data);
    });
  }
}
