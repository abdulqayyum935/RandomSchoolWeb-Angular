import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { Routes } from '@angular/router';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { PersonComponent } from './person/person.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { TestComponent } from './test/test.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {JwtTokenInterceptor} from '../app/services/jwt-token.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    AddNewStudentComponent,
    EditStudentComponent,
    DetailComponent,
    DeleteStudentComponent,
    PersonComponent,
    AddCourseComponent,
    EditCourseComponent,
    CourseDetailsComponent,
    DeleteCourseComponent,
    TestComponent,
    FileUploadComponent,
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtTokenInterceptor,
    multi:true
  }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
