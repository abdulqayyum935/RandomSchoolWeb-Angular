import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/interfaces/course.interface';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {
  course!: Observable<Course>
  courseId: any;
  constructor(private courseService: CourseService, 
    private activatedRoute: ActivatedRoute
    ,private router:Router) { }


  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.course=this.courseService.getCourse(this.courseId);
  }
  delete(){
    console.log(this.courseId)
    this.courseService.delteCourse(this.courseId).subscribe(()=>{
      this.router.navigate(['/courses'])
    })
  }
}
