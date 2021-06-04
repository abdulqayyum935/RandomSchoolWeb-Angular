import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Checkbox } from 'src/interfaces/checkbox.interface';
import { Course } from 'src/interfaces/course.interface';
import { Student } from 'src/interfaces/student.interface';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  // student!: Observable<Student>;
  studentId: any;
  editStudentForm!: FormGroup
  choosenCourses: Checkbox[];
  allCourses: any[];

  constructor(private studentService: StudentService,
    private activatedRouter: ActivatedRoute,
    private router:Router
  ) {

    this.choosenCourses = []
    this.allCourses = []


  }
  ngOnInit(): void {

    this.studentId = this.activatedRouter.snapshot.paramMap.get('id')
    this.studentService.getStudent(this.studentId).subscribe(s => {
      this.name?.setValue(s.name)
      this.email?.setValue(s.email)
      console.log(s.dateOfBirth)
      this.dateOfBirth?.setValue(formatDate(s.dateOfBirth, "yyyy-MM-dd", 'en'))
      this.allCourses = s.courses;

      this.populateCheckBoxes();
     
    });



    this.editStudentForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      dateOfBirth: new FormControl(''),
      courses: new FormArray([])
    });
  }

  populateCheckBoxes() {
    this.allCourses.forEach(c => {
      this.courses.push(new FormControl());
      if(c.isChecked==true){
        this.choosenCourses.push({id:c.id,isChecked:true})
      }
    })
  }

  submit() {
    let form=this.editStudentForm.value;
    delete form.courses
    let updatedForm={...form,courses:this.choosenCourses}
    this.studentService.updateStudent(this.studentId,updatedForm).subscribe(r=>{
    this.router.navigate(['/students'])
    })
    
  }

  checkBoxToggle(id: Number, event: any) {
    if(event.target.checked){
      this.choosenCourses.push({id:id,isChecked:true})
    }else{
      this.choosenCourses=this.choosenCourses.filter(x=>x.id!=id);
    }
  }
 
  get name() { return this.editStudentForm.get('name') }
  get email() { return this.editStudentForm.get('email') }
  get dateOfBirth() { return this.editStudentForm.get('dateOfBirth') }
  get courses() { return this.editStudentForm.get('courses') as FormArray }

}
