import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  config = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
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
    const body = new HttpParams()
      .set('email', value.login)
      .set('password', value.password);

    this.http.post('/api/users', body, this.config).pipe(
      map((response: Response) => {
        console.dir(response);
        return response;
      })
    ).subscribe((data) => {
      console.log('register post done!!!');
      console.dir(data);
    });
  }
}
