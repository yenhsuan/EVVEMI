import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  allStudentsInfo: Array<object>;
  constructor(@Inject('data') private data) {}

  ngOnInit() {
    this.allStudentsInfo = this.data.allStudentsInfo;
    this.data.getStudent();
  }

  editStudent(sid:number) {
    this.data.showUpdateForm = true;
    this.data.editStudent(sid);
  }

}
