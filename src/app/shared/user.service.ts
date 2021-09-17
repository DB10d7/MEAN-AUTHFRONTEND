import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post('http://localhost:3000/api'+'/register',user);
  }

  login(authCredentials:any){
    return this.http.post('http://localhost:3000/api'+'/authenticate',authCredentials);
  }
  setToken(token:string){
    localStorage.setItem('token', token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    var token= localStorage.getItem('token');
    if(token){
      var getUserPayload= atob(token.split('.')[1]);
      return JSON.parse(getUserPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
      var userPayload=this.getUserPayload();
      if(userPayload){
        return userPayload.exp > Date.now() / 1000;
      }
      else
        return false;
  }

}
