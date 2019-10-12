import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register({ email, password }) {
    console.log('register');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/login`, { email, password }/*, this.httpOptions*/)
      .pipe(map(user => {
        // store user details and basic auth credentials in local
        // storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
      // .pipe(
      //   tap((res: any) => console.log('logIn response:', res)),
      //   catchError((err) => {
      //     console.log('err1', err);
      //     return throwError('err2', err);
      //   })
      // );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
