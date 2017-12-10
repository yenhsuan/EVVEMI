import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  coursesList: Array<string>;
  studentsInCourseList: Array<object>;
  constructor(@Inject('data') private data) { }

  ngOnInit() {
    this.coursesList = this.data.coursesList;
    this.studentsInCourseList = this.data.studentsInCourse;
    this.data.getCourse();
  }

  getStudentsListByCourse(course: string) {
    console.log('1');
    this.data.getStudentsListByCourse(course);
  }
}
