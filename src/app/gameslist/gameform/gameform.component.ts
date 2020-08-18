import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-gameform',
  templateUrl: './gameform.component.html',
  styleUrls: ['./gameform.component.css']
})
export class GameformComponent implements OnInit {
  gameForm: FormGroup;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded=false;

  constructor(private formBuilder: FormBuilder,
    private gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.gameForm = this.formBuilder.group({
      title: ['', Validators.required],
      platform: ['', Validators.required],
      description: ['', Validators.required],
      parution: ['', Validators.required]
    });
  }
  onSaveGame() {
    const title = this.gameForm.get('title').value;
    const platform = this.gameForm.get('platform').value;
    const description = this.gameForm.get('description').value;
    const parution = this.gameForm.get('parution').value;
    const newGame = new Game(title, platform,description,parution);
    if(this.fileUrl && this.fileUrl !=='') {
      newGame.cover = this.fileUrl;
    }
    this.gamesService.createNewGame(newGame);
    this.router.navigate(['/games']);
  }
  onUpLoadFile(file: File) {
    this.fileIsUploading = true;
    this.gamesService.uploadFile(file)
      .then((url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
      )
  }
  detectFiles(event) {
    this.onUpLoadFile(event.target.files[0]);
  }
}
