import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, httpOptionsWithToken } from '../../constants/headers';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from 'src/interfaces/course.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  /*
  export const httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':`Bearer ${StorageService.getToken()}`
    })
  };
*/

  constructor(private http: HttpClient,private storage:StorageService) { }

  getCourses(): Observable<Course[]> {
    httpOptionsWithToken.headers.set('Authorization',this.storage.getToken()||'')
    return this.http.get<Course[]>(`${environment.apiUrl}api/course`,httpOptionsWithToken)
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.apiUrl}api/course`, course, httpOptions)
  }

  getCourse(id: any): Observable<Course> {
    return this.http.get<Course>(`${environment.apiUrl}api/Course/${id}`);
  }
  updateCourse(id: any, course: Course): Observable<Course> {
    course.id=id;
    return this.http.put<Course>(`${environment.apiUrl}api/Course/${id}`, course, httpOptions)
  }
  delteCourse(id:any):Observable<any>{
    id=parseInt(id);
    return this.http.delete(`${environment.apiUrl}api/Course/${id}`)
  }

}
