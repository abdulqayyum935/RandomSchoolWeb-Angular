import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Checkbox } from 'src/interfaces/checkbox.interface';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.css']
})
export class AddNewStudentComponent implements OnInit {
  allCourses: Checkbox[];
  addStudentForm!: FormGroup;
  choosenCourses: Checkbox[];

  constructor(private courseService: CourseService,
    private studentService:StudentService,
    private router:Router) {
    this.allCourses = []
    this.choosenCourses = []
  }

  ngOnInit(): void {
    this.addStudentForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.email),
      dob: new FormControl(''),
      courses: new FormArray([])
    });

    this.courseService.getCourses().subscribe(r => {
      r.forEach(item => {

        this.allCourses.push({ id: item.id, title: item.title, isChecked: false })
        this.courses.push(new FormControl(false))
      })
    })
  }
  checkBoxToggle(id: any, event: any) {
    if (event.target.checked) {
      id = parseInt(id);
      this.choosenCourses.push({ id: id, isChecked: true,title:'' })
    } else {
      this.choosenCourses = this.choosenCourses.filter(x => x.id != id)
    }
  }
  get courses() { return this.addStudentForm.get('courses') as FormArray }
  submit(){
  
    delete this.addStudentForm.value.courses;
    let form= {...this.addStudentForm.value,courses:this.choosenCourses} 
    this.studentService.addStudent(form).subscribe(r=>{
      this.router.navigate(['/students'])
    })

  }
}
