import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  newStudentInfo: object;
  newCourseName: string;
  newCourseScore: number;

  constructor(@Inject('data') private data, private location: Location) { 
    this.newCourseName = "";
    this.newCourseScore = null;
  }
  ngOnInit() {
    this.newStudentInfo =this.data.newStudentInfo;
    console.log(this.newStudentInfo['records']);
  }

  addCourse() {
    let isInList: boolean = false;
    this.newStudentInfo["records"].forEach((record: object, i: number) => {
      if (record["course_name"] === this.newCourseName) {
        record["score"] = this.newCourseScore;
        isInList = true;
      }
    });

    if (isInList) {
      return;
    }

    this.newStudentInfo["records"].push({
      "course_name" : this.newCourseName,
      "score" : this.newCourseScore
    });
  }

  addStudent() {
    this.data.addStudent();
  }

  deleteStudent() {
    this.data.deleteStudent();
  }
  
  removeCourse(index: number) {
    this.data.removeCourse(index);
  }

  updateStudent() {
    this.data.updateStudent();
  }

  reset() {
    this.data.reset();
    this.newCourseName = "";
    this.newCourseScore = null;
  }
}
