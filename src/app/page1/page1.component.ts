import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  nextPage() {
    this.router.navigate(['/page2']);
  }

}
