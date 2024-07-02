import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User | null = null;
  public onLoginStatusChange = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) {
    const user = localStorage.getItem('user');
    if (user != null){
      this.user = JSON.parse(user);
    }
  }

  public registerUser(user: User) {
    console.log("Registruojame naują vartotoją");
    return this.httpClient.post("http://localhost:1212/auth/signin", user)
  }

  public loginUser(user: User) {
    return this.httpClient.post<User>("http://localhost:1212/auth/login", user)
      .pipe(tap((response) => {
        this.user = response;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.onLoginStatusChange.emit(true);
      }))
  }

  public logOut(){
    this.user = null;
    localStorage.removeItem('user');
    this.onLoginStatusChange.emit(false);
  }

  public isLoggedin(){
    return (this.user != null && this.user.token != null);
  }

  public canEditLecturesAndGroups(){
    return (this.user != null && (this.user.type == 1))
  }

  public canEditUsers(){
    return (this.user != null && this.user.type == 0);
  }

  public canViewGroup(){
    return (this.user != null && this.user.type == 2);
  }

  public canViewData(){
    return this.isLoggedin();
  }

}