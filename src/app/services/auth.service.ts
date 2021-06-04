import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/constants/headers';
import { environment } from 'src/environments/environment';
import { Register } from "../../interfaces/register.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(newreg: Register): Observable<any> {
    return this.http.post(`${environment.apiUrl}api/Auth/register`, newreg, httpOptions)
  }
  login(login: Register): Observable<{token:string,expiration:Date,userName:string}> {
    return this.http.post<{token:string,expiration:Date,userName:string}>(`${environment.apiUrl}api/Auth/login`, login, httpOptions)
  }
  checkEmailAvailability(emailAddress:String):Observable<{message:Boolean}>{
    return this.http.post<{message:Boolean}>(`${environment.apiUrl}api/Auth/checkEmailAvailability`,{Email:emailAddress},httpOptions)
  }
}
