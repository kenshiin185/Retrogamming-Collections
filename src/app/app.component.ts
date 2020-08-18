import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDwW0z1wD06e7YLPueqRTueL6Ci2CRBAtk",
      authDomain: "videogames-2ed60.firebaseapp.com",
      databaseURL: "https://videogames-2ed60.firebaseio.com",
      projectId: "videogames-2ed60",
      storageBucket: "videogames-2ed60.appspot.com",
      messagingSenderId: "1019938570796",
      appId: "1:1019938570796:web:2859115c5f74f7126cc789",
      measurementId: "G-RG2V401SGC"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
