import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm!:FormGroup;
  constructor(private courseService:CourseService,private route:Router) { }

  ngOnInit(): void {
    this.courseForm=new FormGroup({
      title:new FormControl('',Validators.required),
      creditHour:new FormControl(3,Validators.required),
      isActive:new FormControl(true)
    });
  }
  onSubmit(){
    this.courseService.addCourse(this.courseForm.value).subscribe(apiResponse=>{
      //console.log({apiResponse})
      this.route.navigate(['/courses'])
    })
  }

  get title(){return this.courseForm.get('title')}
  get creditHour(){return this.courseForm.get('creditHour')}
  get isActive(){return this.courseForm.get('isActive')}
}
