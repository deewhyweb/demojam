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
  remaining = '';
  numRounds;
  roundCount;
  baseUrl = 'http://localhost:8091';
  constructor(private http: HttpClient) {}
  getWinnerEmitter() {
    return this.winnerAlert;
  }
  startTimer() {
    console.log('timer')
    var duration = 60*8;
    var timer = 480;
    var minutes
    var seconds;

    setInterval(() => {
        var var1 = timer/60;
        var var2 = timer % 60;
        minutes = parseInt(var1.toString(), 10)
        seconds = parseInt(var2.toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        this.remaining = minutes + ':' + seconds;

        if (--timer < 0) {
            this.remaining = 'Time over!!!';
        }
    }, 1000);
}

  startGame() {
    this.entries = 0;
    this.http
      .get(this.baseUrl + '/api/event/game/start')
      .subscribe(res => {
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
  startRounds(duration, numRounds) {
    this.numRounds = numRounds;
    this.roundCount = 1;
    this.roundsInProgress = true;
    this.startRound().then(() => {
      console.log('Round started');
    })
  }
  endRound() {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.baseUrl + '/api/event/round/end', {})
        .subscribe((res: any) => {
          console.log('Round ended');
          resolve();
        });
    });
  }

  startRound() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseUrl + '/api/event/round/start')
        .subscribe((res: any) => {
          console.log('Rounds started');
          this.startRoundEvent();
          resolve();
        });
    });
  }

  startRoundEvent() {
    this.round++;
    this.entries = 0;
  }
  connect() {
    // this.socket = io(this.baseUrl + '/stream');
    this.socket = new WebSocket('ws://localhost:8091/stream');

    this.socket.onmessage = event => {
      console.log(event);
      var data;
      try {
        data = JSON.parse(event.data);
      }
      catch(err){
         console.log(err);
         return;
      }
      if (data && data.eventType) {
        switch (data.eventType) {
          case 'RoundEndedEvent':
            if (this.roundCount < this.numRounds){
              this.roundCount++;
              this.startRound();
            }
            this.winnerAlert.emit(data.winner);
            break;
          case 'NextQuoteEvent':
            this.quote = data.quote.text;
            break;
          case 'GuessReceivedEvent':
            this.latestEntry = data.player;
            break;
        }
      }
    };
  }
}
