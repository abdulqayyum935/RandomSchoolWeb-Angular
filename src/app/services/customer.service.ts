import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseInt } from 'src/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  

  getCustomers(pageNumber:number):Observable<ResponseInt> {
    return this.http.get<ResponseInt>(`${environment.apiUrl}api/customer?pageNumber=${pageNumber}&pageSize=10`)
  }
}



