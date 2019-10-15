import { Component } from "@angular/core";
import { GameService } from "../app/game.service";
import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public gameService: GameService, public router: Router, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }
  closeResult: string;
  modalOptions:NgbModalOptions;

  title = "newapp";
  home() {
    this.router.navigate(["/home"]);
  }
  coreEngine() {
    this.router.navigate(["/page1"]);
  }
  controls() {
    this.router.navigate(["/controls"]);
  }
  twitter() {
    this.router.navigate(["/page2"]);
  }
  cqrs() {
    this.router.navigate(["/page3"]);
  }
  api() {
    this.router.navigate(["/page4"]);
  }

  open(content) {
    console.log(content);
    this.modalService.open('mymodal', this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }



}
