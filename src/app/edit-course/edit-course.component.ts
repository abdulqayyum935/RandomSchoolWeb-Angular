import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from 'src/interfaces/course.interface';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course!: Course;
  editCourse!:FormGroup
  courseId!:string|null;
  constructor(private route: ActivatedRoute, 
    private courseService: CourseService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
    this.editCourse=new FormGroup({
      title:new FormControl('',Validators.required),
      creditHour:new FormControl('',Validators.required),
      isActive:new FormControl()
    });

    this.courseId = this.route.snapshot.paramMap.get('id')
    this.courseService.getCourse(this.courseId).subscribe(course => {
      this.course = course
      this.editCourse.get('title')?.setValue(course.title);
      this.editCourse.get('creditHour')?.setValue(course.creditHour);
      this.editCourse.get('isActive')?.setValue(course.isActive);
    })
  }
  get title(){return this.editCourse.get('title')}
  get creditHour(){return this.editCourse.get('creditHour')}
  get isActive(){return this.editCourse.get('isActive')}
  submit(){
    this.courseService.updateCourse(this.courseId,this.editCourse.value).subscribe(course=>{
      this.router.navigate(['/courses'])
    })
  }

}
