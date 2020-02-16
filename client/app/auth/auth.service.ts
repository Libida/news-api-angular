import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
  errorMsgsChange: Subject<string[]> = new Subject<string[]>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.userChange.subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data.user));
    });
  }

  getUserData() {
    const userData: User = {};
    userData.user = JSON.parse(localStorage.getItem('user'));

    return userData;
  }

  isAuthorized() {
    return !!this.getUserData().user._id;
  }

  login(value) {
    this.auth('/api/login', value);
  }

  logout() {
    this.http.get('/api/logout', this.config).subscribe((data: User) => {
      this.errorMsgsChange.next(data.errorMessages);
      this.userChange.next(data);
    });
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
