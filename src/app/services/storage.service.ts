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
 getUserName() {
     //return this.loggedUser.getValue();
   return  localStorage.getItem('userName')
   }

  getToken(): string | null {
    return localStorage.getItem('token')
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
  saveUserName(name:string){
    localStorage.setItem('userName',name)
  }

  getUserRole(){
    const helper = new JwtHelperService();
    let data= helper.decodeToken(this.getToken()||'')
    return data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }

  // getUserName(){
  //   return localStorage.getItem('userName') || null;
  // }
}
