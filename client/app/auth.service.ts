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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  errorMsgsChange: Subject<string[]> = new Subject<string[]>();
  userChange: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.userChange.subscribe(data => {
      this.userDetails = data;
    });
  }

  login(value) {
    console.log('auth service login');
    console.dir(value);
    // this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    this.http.post('/sign-in', JSON.stringify(value), this.httpOptions).subscribe((data) => {
      console.log('login post done!!');
      console.dir(data);
    });
  }

  register(value) {
    const body = new HttpParams()
      .set('email', value.login)
      .set('password', value.password);

    this.http.post<User>('/api/users', body, this.config).pipe(
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
