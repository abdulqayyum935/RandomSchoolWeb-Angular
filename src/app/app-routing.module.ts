import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { CustomerComponent } from './customer/customer.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { DetailComponent } from './detail/detail.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { PersonComponent } from './person/person.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { StudentsComponent } from './students/students.component';
import { TestComponent } from './test/test.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



const appRoutes: Routes = [
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuardGuard] },
  { path: 'add-new-student', component: AddNewStudentComponent, canActivate: [AuthGuardGuard] },
  { path: 'edit/:id', component: EditStudentComponent, canActivate: [AuthGuardGuard] },
  { path: 'details/:id', component: DetailComponent, canActivate: [AuthGuardGuard] },
  { path: 'delete/:id', component: DeleteStudentComponent, canActivate: [AuthGuardGuard] },
  { path: 'person', component: PersonComponent, canActivate: [AuthGuardGuard] },

  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardGuard] },

  // course related routes
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardGuard], data: { role: 'student' } },
  { path: 'course-detail/:id', component: CourseDetailsComponent, canActivate: [AuthGuardGuard], data: { role: 'student' } },
  { path: 'edit-course/:id', component: EditCourseComponent, canActivate: [AuthGuardGuard], data: { role: 'student' } },
  { path: 'delete-course/:id', component: DeleteCourseComponent, canActivate: [AuthGuardGuard], data: { role: 'student' } },
  { path: 'new-course', component: AddCourseComponent, canActivate: [AuthGuardGuard], data: { role: 'student' } },

  { path: 'user', component: TestComponent, canActivate: [AuthGuardGuard] },
  { path: 'file-upload', component: FileUploadComponent, canActivate: [AuthGuardGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorize', component: UnauthorizedComponent },
  { path: '', component: StudentsComponent, canActivate: [AuthGuardGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
