import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  prevPage() {
    this.router.navigate(['/page1']);
  }

  nextPage() {
    this.router.navigate(['/page3']);
  }

}
