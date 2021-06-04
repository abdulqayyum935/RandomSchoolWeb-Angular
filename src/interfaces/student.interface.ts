import { StudentCourses } from "../interfaces/studentCourse";
import { Checkbox } from "./checkbox.interface";

export interface Student{
courses: any[];
id:Number,
email:string,
name:string,
dateOfBirth:Date,
studentCourses:Checkbox[]
}