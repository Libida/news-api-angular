import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

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
    // this.http.post('/sign-up', JSON.stringify(value));
    console.log('auth service register');
    console.dir(value);
    // this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    this.http.post('/sign-up', JSON.stringify(value), this.httpOptions).subscribe((data) => {
      console.log('register post done!!');
      console.dir(data);
    });

  }
}
