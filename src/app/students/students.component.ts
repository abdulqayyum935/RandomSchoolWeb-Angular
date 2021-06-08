import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError, retry,map } from 'rxjs/operators';

import {Student} from '../../interfaces/student.interface'
import { StudentService } from '../services/student.service';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
students!:Observable<Student[]>;
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.students=this.studentService.getStudents().pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
