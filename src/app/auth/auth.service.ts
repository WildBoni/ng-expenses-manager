import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fbSubs: Subscription[] = [];
  private user: User;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
    private expensesService: ExpensesService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }
        this.store.dispatch(new Auth.SetAuthenticated());
        this.store.dispatch(new Auth.SetUserId(this.user));
        this.fetchUsers();
        this.router.navigate(['/dashboard']);
      } else {
        this.expensesService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
      });
  }

  doFacebookLogin(){
    this.store.dispatch(new UI.StartLoading());
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.auth.FacebookAuthProvider();
       this.afAuth.auth
       .signInWithPopup(provider)
       .then(res => {
         console.log(res);
         this.user = {
           id: res.user.uid,
           name: res.user.displayName,
           email: res.user.email,
           photo: res.user.photoURL
         }
         this.store.dispatch(new Auth.SetUserId(this.user));
         this.store.dispatch(new UI.StopLoading());
         this.fetchUsers();
         resolve(res);
       }, err => {
         this.store.dispatch(new UI.StopLoading());
         console.log(err);
         reject(err);
       })
     })
  }

  fetchUsers() {
    this.fbSubs.push(this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              email: doc.payload.doc.data()['email'],
              photo: doc.payload.doc.data()['photo']
            }
          });
        })
      )
      .subscribe(
        (users: User[]) => {
          this.store.dispatch(new Auth.SetUsers(users));
          this.fetchUser(this.user.id);
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  fetchUser(id) {
    let pippo = this.db
      .collection('users', ref => ref.where('id', '==', id))
      .snapshotChanges()
      .subscribe(
      (user) => {
        if(user.length != 0) {
          console.log(user);
        } else {
          this.addUser(this.user);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addUser(user) {
    this.db.collection('users').add(user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
