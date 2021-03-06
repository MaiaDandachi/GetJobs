import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('userInfo')!)
    );
    this.user = this.userSubject.asObservable();
  }

  // get the value of the currently logged in user without having to subscribe to the user Observable.
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string, userType: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/${userType}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ ...user, userType })
          );
          this.userSubject.next({ ...user, userType });
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userInfo');
    this.userSubject.next(null!);
    this.router.navigate(['/login']);
  }

  signup(username: string, email: string, password: string, userType: string) {
    return this.http.post<any>(`${environment.apiUrl}/${userType}`, {
      username,
      email,
      password,
    });
  }
}
