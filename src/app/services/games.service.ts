import { Injectable, Provider } from '@angular/core';
import { Game } from '../models/game.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;



@Injectable()
export class GamesService {
  games: Game[] = [];
  gamesSubject = new Subject<Game[]>();

  constructor() {
    this.getGames();
  }
  emitGames() {
    this.gamesSubject.next(this.games);
  }
  saveGames() {
    firebase.database().ref('/games').set(this.games);
  }
  getGames() {
    firebase.database().ref('/games')
      .on('value', (data: DataSnapshot) => {
        this.games = data.val()? data.val() : [];
        this.emitGames();
      });
  }
  getSingleGame(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/games/'+ id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      }
    );
  }
  createNewGame(newGame: Game) {
    this.games.push(newGame);
    this.saveGames();
    this.emitGames();
  }
  removeGame(game: Game) {
    if (game.cover) {
      const storageRef = firebase.storage().refFromURL(game.cover);
      storageRef.delete().then(
        () => {
          console.log('couverture supprimée !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const gameIndexToRemove = this.games.findIndex(
      (gameEl) => {
        if (gameEl === game) {
          return true;
        }
      }
    );
    this.games.splice(gameIndexToRemove, 1);
    this.saveGames();
    this.emitGames();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement...');
          },
          (error) => {
            console.log('erreur de chargement' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
