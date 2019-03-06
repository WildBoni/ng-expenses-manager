import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private expensesService: ExpensesService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/dashboard']);
      } else {
        this.expensesService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {

      })
      .catch(error => {
        console.log(error);
      });
  }

  doFacebookLogin(){
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.auth.FacebookAuthProvider();
       this.afAuth.auth
       .signInWithPopup(provider)
       .then(res => {
         resolve(res);
       }, err => {
         console.log(err);
         reject(err);
       })
     })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
