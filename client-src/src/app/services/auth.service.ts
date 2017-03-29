import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

const domain = 'http://localhost:8080'

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  register(user :any) {
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('/register', user, {headers:headers})
      .map(res => res.json())

  }

  authenticateUser(user: any) {
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post('/authenticate', user, {headers:headers})
      .map(res => res.json())

  }

    fbLogin() {

    return this.http.get('/auth/facebook')
      .map(res => res.json())

  }
  twitterLogin() {

    return this.http.get('/auth/twitter')
      .map(res => res.json())

  }

  getProfile() {
    console.log('getprofile')
    const headers = new Headers();
    this.loadToken()
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type','application/json');

    return this.http.get('/profile')
      .map(res => res.json())

  }

 

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired()
  }


  logOutUser() {
    this.authToken = null
    this.user = null;
    localStorage.clear()
  }

}
