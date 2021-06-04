import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from 'src/constants/headers';
import { environment } from 'src/environments/environment';
import { Student } from 'src/interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getStudents():Observable<Student[]>{
    return this. http.get<Student[]>(`${environment.apiUrl}api/students/students`)
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.apiUrl}api/students`, student, httpOptions)
  }
  getStudent(id:any){
   return this.http.get<Student>(`${environment.apiUrl}api/students/${id}`);
  }
 updateStudent(id:Number,student:Student):Observable<Student>{
   student.id=id;
   return this.http.put<Student>(`${environment.apiUrl}api/students/${id}`,student,httpOptions)
 }
 delete(id:Number):Observable<Boolean>{
   return this.http.delete<Boolean>(`${environment.apiUrl}api/students/delete/student/${id}`)
 }
}
