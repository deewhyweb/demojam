import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  gameInProgress = false;
  roundInProgress = false;
  gameId = "";
  progressVal = 0;
  duration = 30;
  progressStyle = 'width: 0%';
  roundComplete = false;
  constructor(public router: Router, public gameService: GameService) { }

  ngOnInit() {
  }
  startGame() {
    console.log('Game started');
    this.gameService.startGame();
    this.gameInProgress = true;
  }

  stopGame() {

    this.gameService.stopGame();
    this.gameInProgress = false;

  }
  startRound() {
    this.gameService.startRounds();

  }

  finishRound() {
    this.roundComplete = true;
  }

  resetGame() {
    this.roundInProgress = false;
    this.roundComplete = false;
    this.progressVal = 0;
  }
  incrementProgress() {
    console.log(this.progressVal);
    console.log((this.duration * 1000) / 100);
    if (this.progressVal < 100){
      this.progressVal++;
      this.progressStyle = 'width: ' + this.progressVal + '%';
      setTimeout(() => {
        this.incrementProgress();
      }, (this.duration * 1000) / 100);
    } else {
      setTimeout(() => {
        this.finishRound();
      }, 2000);

    }
  }

  selectWinner() {
    console.log('Select winner');
    this.resetGame();
  }
  nextPage() {
    this.router.navigate(['/page1']);
  }


}
