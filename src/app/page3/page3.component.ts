import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  prevPage() {
    this.router.navigate(['/page2']);
  }

  nextPage() {
    this.router.navigate(['/page4']);
  }

}
