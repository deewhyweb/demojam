import { Component, ElementRef, ViewChild } from "@angular/core";
import { GameService } from "../app/game.service";
import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('clickBtn',  {static: true})
  clickBtn: ElementRef;
  winner: string;
  subscription: any;
  closeResult: string;
  modalOptions: NgbModalOptions;
  title = 'newapp';

  constructor(public gameService: GameService, public router: Router, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }


  }
  ngOnInit() {
    this.gameService.startTimer();
    this.subscription = this.gameService.getWinnerEmitter()
      .subscribe(winner => {
        console.log('winner emitted');
        this.winner = winner;
        this.clickBtn.nativeElement.click();

      });
  }


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
  coreSub() {
    this.router.navigate(["/core-sub"]);
  }

  open(content) {
    // this.winner = '@deewhyweb';
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }



}
