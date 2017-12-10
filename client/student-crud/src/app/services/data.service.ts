import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  newStudentInfo: object;
  allStudentsInfo: Array<object>;
  coursesList: Array<string>;
  studentsInCourse: Array<object>;

  showUpdateForm: boolean;
  
  constructor(private http: Http) { 
    this.newStudentInfo = {
      "sid" : null,
      "firstName" : "",
      "lastName" : "",
      "records" : [
      ]
    };

    this.allStudentsInfo = [];
    this.coursesList = [];
    this.studentsInCourse = [];
    this.showUpdateForm = false;
  }

  addStudent() {
    this.http.post('api/v1/student', this.newStudentInfo)
      .toPromise()
      .then( (response: Response) => {
        //console.log(response.json());
        this.reset();
        return response.json();
      })
      .catch(this.handleError);
  }

  getStudent() {
    this.http.get(`api/v1/student`)
      .toPromise()
      .then( (response: Response) => {
        this.allStudentsInfo.length = 0;
        const students: Array<object> = JSON.parse(response['_body'])['students'];
        students.forEach((student, i) => {
          this.allStudentsInfo.push(student);
        });
        this.reset();
      })
      .catch(this.handleError);
  }

  editStudent(sid: number) {
    this.http.get(`api/v1/student/${sid}`)
    .toPromise()
    .then( (response: Response) => {
      const student: Array<object> = JSON.parse(response['_body']);
      this.newStudentInfo['sid'] = student['info']['sid'];
      this.newStudentInfo['firstName'] = student['info']['first_name'];
      this.newStudentInfo['lastName'] = student['info']['last_name'];

      const studentRecord: Array<object> = this.newStudentInfo['records'];
      studentRecord.length = 0;
      student['record'].forEach((course, i) => {
        this.newStudentInfo['records'].push(course);
      });
    })
    .catch(this.handleError);
  }

  removeCourse(index: number) {
    this.newStudentInfo['records'].splice(index, 1);
  }

  deleteStudent() {
    if (this.newStudentInfo['sid'] !== null) {
      this.http.delete(`api/v1/student/${this.newStudentInfo['sid']}`)
        .toPromise()
        .then( (response: Response) => {
          console.log(response.json());
          this.getStudent();
        })
        .catch(this.handleError);
    }
  }

  updateStudent() {
    this.http.delete(`api/v1/student/${this.newStudentInfo['sid']}`)
      .toPromise()
      .then( (response: Response) => {
          this.http.post('api/v1/student', this.newStudentInfo)
          .toPromise()
          .then( (response: Response) => {
            //console.log(response.json());
            this.reset();
            return response.json();
          })
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  getCourse() {
    this.http.get(`api/v1/course`)
    .toPromise()
    .then( (response: Response) => {
      this.coursesList.length = 0;
      const courses: Array<string> = JSON.parse(response['_body'])['course'];
      courses.forEach((course: string, i: number) => {
        this.coursesList.push(course);
      });
    })
    .catch(this.handleError);
  }

  getStudentsListByCourse(course: string) {
    this.http.get(`api/v1/course/${course}`)
    .toPromise()
    .then( (response: Response) => {
      this.studentsInCourse.length = 0;
      const records: Array<object> = JSON.parse(response['_body'])['students'];
      records.forEach((record: object, i: number) => {
        this.studentsInCourse.push(record);
      });
      console.log(this.studentsInCourse);
    })
    .catch(this.handleError);
  }

  reset() {
    this.newStudentInfo['sid'] = null;
    this.newStudentInfo['firstName'] = "";
    this.newStudentInfo['lastName'] = "";
    this.newStudentInfo['records'].length = 0;
    this.showUpdateForm = false;
  }
    
  private handleError(error: any): Promise<any> {
    console.error("[!]Error : ");
    return Promise.reject(error.body || error);
  }
}
