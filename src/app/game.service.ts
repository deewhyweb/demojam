import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  winnerAlert: EventEmitter<string> = new EventEmitter();
  private socket;
  gameInProgress = false;
  roundsInProgress = false;
  quote = '';
  entries = 0;
  round = 0;
  latestEntry = '';
  baseUrl = 'http://localhost:8091';
  constructor(private http: HttpClient) {}
  getWinnerEmitter() {
    return this.winnerAlert;
  }
  startGame() {
    this.entries = 0;
    this.http.post(this.baseUrl + '/api/event/game/start', {}).subscribe(res => {
      console.log(res);
      this.gameInProgress = true;
      this.connect();
    });
    // setTimeout(() => {
    //   this.winnerAlert.emit('@deewhyweb');
    // }, 5000);
  }

  stopGame() {
    this.gameInProgress = false;
    this.roundsInProgress = false;
    this.round = 0;
    this.quote = '';
    this.socket.close();
  }
  startRounds() {

    this.roundsInProgress = true;
    this.http.post(this.baseUrl + '/api/event/round/start',{}).subscribe((res: any) => {
      console.log('Rounds started');
      setTimeout(() => {
        this.http.post(this.baseUrl + '/api/event/round/end',{}).subscribe((res: any) => {
          console.log('Rounds Finished');
          this.http.post(this.baseUrl + '/api/event/round/start',{}).subscribe((res: any) => {
            console.log('Rounds started');
          });
        });
      }, 10000);
    });
  }

  startRound() {
    this.round++;
    this.entries = 0;
  }
  connect() {
    // this.socket = io(this.baseUrl + '/stream');
    this.socket = new WebSocket('ws://localhost:8091/stream');

    this.socket.onmessage = event => {
      console.log(event);
      if (event && event.data && event.data) {
        switch (event.data) {
          case 'Round Started!':
            this.startRound();
            break;
          case 'RoundEndedEvent':

            this.winnerAlert.emit(event.data.round.winner);
            break;
          case 'NextQuoteEvent':
            this.quote = event.data.quote.text;
            break;
          case 'GameEndedEvent':
            this.stopGame();
            break;
          case 'GuessReceivedEvent':
            this.latestEntry = event.data.player;
            break;
        }
      }
    };
  }
}
