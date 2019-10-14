import { Page1Component } from './page1/page1.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private socket;
  gameInProgress = false;
  roundsInProgress = false;
  quote = '';
  entries = 0;
  round = 0;
  latestEntry = "";
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  startGame() {
    this.entries = 0;
    this.http.get(this.baseUrl + '/api/game').subscribe(res => {
      console.log(res);
      this.gameInProgress = true;

    });
  }

  stopGame() {
    this.gameInProgress = false;
    this.roundsInProgress = false;
    this.round = 0;
    this.quote = '';
    this.socket.disconnect();
  }
  startRounds(duration) {
    this.startRound();
    this.connect();
    this.roundsInProgress = true;
    const interval = setInterval(() => {
      if (this.gameInProgress) {
        this.startRound();
      } else {
        clearInterval(interval);
      }

    }, duration * 1000);
  }

  startRound() {
    this.round++;
    this.http.get(this.baseUrl + '/api/rounds').subscribe((res: any) => {
      console.log(res.quote);
      this.quote = res.quote;
    });
  }
  connect() {
    this.socket = io('http://localhost:8080');
    console.log('connected');

    this.socket.on('NEW_GUESS', data => {
      console.log('Received message from Websocket Server');
      console.log(data);
      this.entries++;
      this.latestEntry = data;
    });
    this.socket.on('NEW_QUOTE', data => {
      console.log('Received message from Websocket Server');
      this.quote = data;
    });

  }
}
