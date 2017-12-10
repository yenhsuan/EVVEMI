import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject('data') private data,private route: Router, private location: Location) { }

  ngOnInit() {
  }

  reset() {
    this.data.reset();
  }

}
