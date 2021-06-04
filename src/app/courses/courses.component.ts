import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/interfaces/course.interface';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private courseService:CourseService) { }

  courses!:Observable<Course[]>;
  
  ngOnInit(): void {
    this.courses=this.courseService.getCourses();
  }

}
