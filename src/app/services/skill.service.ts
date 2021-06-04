import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { skill } from '../../interfaces/skill.interface';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http:HttpClient){ }

  get():Observable<skill[]>{
   return this.http.get<skill[]>(`${environment.apiUrl}skills`);
  }

}
