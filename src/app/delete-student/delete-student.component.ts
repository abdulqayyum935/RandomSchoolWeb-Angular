import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/interfaces/student.interface';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  student!: Student;
  studnetId!: any;

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.studnetId = this.activatedRoute.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studnetId).subscribe(student => {
      this.student = student;
      this.student.courses = this.student.courses.filter(x => x.isChecked)
    })
  }
  delete(id:Number){
    this.studentService.delete(id).subscribe(r=>{
      this.router.navigate(['/students'])
    })
  }

}
