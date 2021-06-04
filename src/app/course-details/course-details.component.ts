import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/interfaces/course.interface';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course:Course | undefined;

  constructor(private route:ActivatedRoute,private courseService:CourseService) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    console.log(typeof id)
    console.log(id)
  this.courseService.getCourse(id).subscribe(r=>{
  this.course=r;
  })
  

  }

}
