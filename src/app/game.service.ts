import { Page1Component } from './page1/page1.component';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GameService {
  gameInProgress = false;
  roundsInProgress = false;
  quote = '';
  round = 0;
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  startGame() {
    this.http.get(this.baseUrl + '/games/start').subscribe(res => {
      console.log(res);
      this.gameInProgress = true;

    });
  }

  stopGame() {
    this.gameInProgress = false;
    this.roundsInProgress = false;
    this.round = 0;
    this.quote = '';
  }
  startRounds(duration) {
    this.startRound();
    this.roundsInProgress = true;
    const interval = setInterval(() => {
      if (this.gameInProgress){
        this.startRound()
      } else {
        clearInterval(interval)
      }

    }, duration * 1000)
  }

  startRound(){
    this.round++;
    this.http.get(this.baseUrl + '/games/rounds/start').subscribe((res: any) => {
      console.log(res.quote);
      this.quote = res.quote;
    });
  }
}
