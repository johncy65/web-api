import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = 'http://localhost:5022/api/user/register';
  loginUrl = 'http://localhost:5022/api/user/login';
  getProfileDetailsUrl = 'http://localhost:5022/api/user/profile';
  savePasswordUrl = 'http://localhost:5022/api/user/password';

  constructor(private http: HttpClient, private router:Router) { }

  register(userObject){
    return this.http.post(this.registerUrl, userObject)
    .pipe(
      tap(data => this.setSession(data))
    );
  }

  getProfileDetails(){
    return this.http.get(this.getProfileDetailsUrl,{
      headers:new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    });
  }

  saveProfile(updateObject){
    return this.http.post(this.getProfileDetailsUrl, updateObject,{
      headers:new HttpHeaders().set('Authorization', localStorage.getItem('token'))
    });
  }

  savePassword(passwordObject){
    return this.http.post(this.savePasswordUrl, passwordObject,{
      headers:new HttpHeaders().set('Authorization', localStorage.getItem('token'))
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  get isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  setSession(data){
    console.log(data);
    localStorage.setItem('token',data.data.token);
  }

  login(userObject){
    return this.http.post(this.loginUrl, userObject)
    .pipe(
      tap(data => this.setSession(data))
    );
  }
}
