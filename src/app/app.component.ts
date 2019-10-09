import { Component } from "@angular/core";
import { GameService } from "../app/game.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public gameService: GameService, public router: Router) {

  }

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


}
