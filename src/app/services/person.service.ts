import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Person } from 'src/interfaces/person.interface';
import { Observable } from 'rxjs';
import {environment} from './../../environments/environment'
import { httpOptions } from '../../constants/headers'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }
  
  savePerson(person:Person){
    this.http.post(`${environment.apiUrl}Add`,person,httpOptions).subscribe(x=>{
      console.log(x)
    })
  }
}
