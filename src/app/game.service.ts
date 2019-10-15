import { EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class GameService {
  winnerAlert: EventEmitter<string> = new EventEmitter();
  private socket;
  gameInProgress = false;
  roundsInProgress = false;
  quote = "";
  entries = 0;
  round = 0;
  latestEntry = "";
  baseUrl = "http://localhost:8091";
  constructor(private http: HttpClient) {}
  getWinnerEmitter() {
    return this.winnerAlert;
  }
  startGame() {
    this.entries = 0;
    this.http.get(this.baseUrl + "/api/game").subscribe(res => {
      console.log(res);
      this.gameInProgress = true;
    });
    setTimeout(() => {
      this.winnerAlert.emit("@deewhyweb");
    }, 5000);
  }

  stopGame() {
    this.gameInProgress = false;
    this.roundsInProgress = false;
    this.round = 0;
    this.quote = "";
    this.socket.disconnect();
    console.log("Emitting winner");
  }
  startRounds(duration) {
    this.connect();
    this.startRound();
    this.roundsInProgress = true;
    // const interval = setInterval(() => {
    //   if (this.gameInProgress) {
    //     this.startRound();
    //   } else {
    //     clearInterval(interval);
    //   }

    // }, duration * 1000);
  }

  startRound() {
    this.round++;
    this.http.get(this.baseUrl + "/api/rounds").subscribe((res: any) => {
      console.log(res.quote);
      this.quote = res.quote;
    });
  }
  connect() {
    // this.socket = io(this.baseUrl + '/stream');
    this.socket = new WebSocket("ws://localhost:8091/stream");
    console.log("connected");
    this.socket.onmessage = event => {
      console.log(event);
    };
    // this.socket.onmessage("NEW_GUESS", data => {
    //   console.log("Received message from Websocket Server");
    //   console.log(data);
    //   this.entries++;
    //   this.latestEntry = data;
    // });
    // this.socket.on("NEW_QUOTE", data => {
    //   console.log("Received message from Websocket Server");
    //   this.quote = data;
    // });
  }
}
