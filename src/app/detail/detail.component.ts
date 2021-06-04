import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/interfaces/student.interface';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  studentId!: any;
  student!:Student;
  //courses!:StudentCourse[];
  constructor(private route: ActivatedRoute,
    private studentService:StudentService
    ) {
    this.studentId = this.route.snapshot.paramMap.get('id')
    
  }

  ngOnInit(): void {
  this.studentService.getStudent(this.studentId).subscribe(std=>{
    this.student=std;
    this.student.courses=this.student.courses.filter(x=>x.isChecked==true)
  })
  }

}
