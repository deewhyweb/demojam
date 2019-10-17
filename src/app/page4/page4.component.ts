import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']

})
export class Page4Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }


  nextPage() {
    this.router.navigate(['/core-sub']);
  }


}
