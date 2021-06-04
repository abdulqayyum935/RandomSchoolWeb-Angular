import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { httpOptions } from 'src/constants/headers';
import { environment } from 'src/environments/environment';
import { User } from 'src/interfaces/user.interface';


@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 
  userForm!: FormGroup;
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      dateOfBirth: new FormControl(''),
      age: new FormControl('')
    })

  }
  get name() { return this.userForm.get('name') }
  get email() { return this.userForm.get('email') }
  get dateOfBirth() { return this.userForm.get('dateOfBirth') }
  get age() { return this.userForm.get('age') }

  onBlur() {
    console.log('blur called')
  }
  submitForm() {
   
    let form = this.userForm.value;
    // delete form.age;
    // delete form.name;
    // delete form.dateOfBirth;

    this.http.post<User>(`${environment.apiUrl}api/User`
      , form, httpOptions).pipe(catchError(this.handleError.bind(this))).subscribe(r => { console.log({ r }) })
  }

  handleNameValidation(msg: any): void {
    this.name?.setErrors({ "custom": msg })
  }
  handleEmailValidation(msg: any) {
    this.email?.setErrors({ "custom": msg[0] })
  }
  handleDobValidation(msg: any) {
    this.dateOfBirth?.setErrors({ "custom": msg[0] })
  }
  hadleAgeValidation(msg: any) {
    this.age?.setErrors({ "custom": msg[0] })
  }

  handleError(error: HttpErrorResponse) {

    //console.log(error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
    } else {
      console.log('server error', error.error?.errors)
      let object = error.error?.errors;
      for (let i in object) {
        //console.log(object[i])
        if (i === "Name") {

          this.handleNameValidation(object[i])
        } else if (i === "Email") {
          this.handleEmailValidation(object[i])
        } else if (i === "DateOfBirth") {
          this.handleDobValidation(object[i])
        } else if (i === "Age") {
          this.hadleAgeValidation(object[i])
        }
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
