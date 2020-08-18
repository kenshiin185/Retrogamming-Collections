import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';


@Component({
  selector: 'app-singlegame',
  templateUrl: './singlegame.component.html',
  styleUrls: ['./singlegame.component.css']
})
export class SinglegameComponent implements OnInit {
  game: Game;
 


  constructor(private route: ActivatedRoute, 
              public gamesService: GamesService, 
              private router: Router) { }

  ngOnInit() {
    this.game = new Game('','','','');
    const id:number = this.route.snapshot.params['id'];
    this.gamesService.getSingleGame(+id).then(
      (game: Game) => {
        this.game = game;
      }
    );
  }
  onBack() {
    this.router.navigate(['/game']);
  }
}
