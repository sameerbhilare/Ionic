/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@capacitor/storage';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    // whether user is authenticated.
    // if the token is present and valid then yes
    return this._user
      .asObservable()
      .pipe(map((user) => (user && user.token ? true : false))); // shortcut=> !!user.token
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        }
        return null;
      })
    );
  }

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this))); // this inside of setUserData should refer to AuthService class and not to tap function
  }

  login(email: string, password: string) {
    //this._userIsAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this))); // this inside of setUserData should refer to AuthService class and not to tap function
  }

  logout() {
    // emit user logout
    this._user.next(null);
  }

  private setUserData(authData: AuthResponseData) {
    // calculate expiration time
    // what we get in 'expiresIn' is 'The number of seconds in which the ID token expires.'
    const expirationTime: Date = new Date(
      new Date().getTime() + +authData.expiresIn * 1000
    );
    // emit user login
    this._user.next(
      new User(
        authData.localId,
        authData.email,
        authData.idToken,
        expirationTime
      )
    );
    // stora data in localstorate/device storage
    this.storeAuthData(
      authData.localId,
      authData.idToken,
      expirationTime.toISOString()
    );
  }

  // storing imp data via Capacitor/Storage
  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string
  ) {
    const userData = JSON.stringify({ userId, token, tokenExpirationDate });
    // storage needs to string data only
    Storage.set({ key: 'AuthData', value: userData });
  }
}
