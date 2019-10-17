import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core-sub',
  templateUrl: './core-sub.component.html',
  styleUrls: ['./core-sub.component.css']
})
export class CoreSubComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  nextPage() {
    this.router.navigate(['/controls']);
  }
}
