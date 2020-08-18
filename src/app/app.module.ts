import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { GameslistComponent } from './gameslist/gameslist.component';
import { SinglegameComponent } from './gameslist/singlegame/singlegame.component';
import { GameformComponent } from './gameslist/gameform/gameform.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { GamesService } from './services/games.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

const appRoutes:Routes=[
  {path: 'auth/signup', component:SignupComponent},
  {path: 'auth/signin', component:SigninComponent},
  {path: 'games', canActivate: [AuthGuardService], component:GameslistComponent},
  {path: 'games/new',canActivate: [AuthGuardService], component:GameformComponent},
  {path: 'games/view/:id',canActivate: [AuthGuardService], component:SinglegameComponent},
  {path:'',redirectTo:'games',pathMatch:'full'},
  {path:'**',redirectTo:'games'}
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    GameslistComponent,
    SinglegameComponent,
    GameformComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [
    AuthService,
    GamesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
