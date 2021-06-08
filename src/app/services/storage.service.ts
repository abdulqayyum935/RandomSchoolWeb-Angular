import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // public loggedIn = new BehaviorSubject<boolean>(false);
  // public loggedUser= new BehaviorSubject<string>(<string>{});

  //   get isLoggedIn() {
  //   return this.loggedIn.asObservable(); // {2}
  // }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getUserName() {
    let name = localStorage.getItem('userName') as string;
    return name == null ? "-" : name;
  }

  getToken(): string {
    return localStorage.getItem('token')||'abc'
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }

  Logout() {
    localStorage.clear();
  }
  saveUserName(name: string) {
    localStorage.setItem('userName', name)
  }

  getUserRole() {
    const helper = new JwtHelperService();
    let data = helper.decodeToken(this.getToken() || '')
    return data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }
  isTokenExpired() {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.getToken() || '')
  }


}
