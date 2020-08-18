import { Component, OnInit,OnDestroy } from '@angular/core';
import { Game } from '../models/game.model';
import { Subscription } from 'rxjs/Subscription';
import { GamesService } from '../services/games.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit, OnDestroy {
games:Game[];
gamesSubscription: Subscription;
  constructor(private gamesService:GamesService, private router:Router) { }

  ngOnInit() {
    this.gamesSubscription=this.gamesService.gamesSubject.subscribe(
      (games:Game[])=> {
        this.games=games;
      }
    );
    this.gamesService.getGames();
    this.gamesService.emitGames();
  }
onNewGame() {
  this.router.navigate(['/games','new']);
}
onDeleteGame(game:Game) {
  this.gamesService.removeGame(game);
}
onViewGame(id:number) {
  this.router.navigate(['/games','view',id]);
}
ngOnDestroy() {
  this.gamesSubscription.unsubscribe();
}
}
