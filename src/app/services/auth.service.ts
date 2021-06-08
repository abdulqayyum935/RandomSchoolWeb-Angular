import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { httpOptions } from 'src/constants/headers';
import { environment } from 'src/environments/environment';
import { Register } from "../../interfaces/register.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  
  private _userName=new  Subject<string>();
  public userNameChanged=this._userName.asObservable();

  constructor(private http: HttpClient) { }


  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
public sentUserNameChangeNotification=(name:string)=>{
  this._userName.next(name);
}

  register(newreg: Register): Observable<any> {
    return this.http.post(`${environment.apiUrl}api/Auth/register`, newreg, httpOptions)
  }
  login(login: Register): Observable<{token:string,expiration:Date,userName:string,refreshToken:string}> {
    return this.http.post<{token:string,expiration:Date,userName:string,refreshToken:string}>(`${environment.apiUrl}api/Auth/login`, login, httpOptions)
  }
  checkEmailAvailability(emailAddress:String):Observable<{message:Boolean}>{
    return this.http.post<{message:Boolean}>(`${environment.apiUrl}api/Auth/checkEmailAvailability`,{Email:emailAddress},httpOptions)
  }
}
