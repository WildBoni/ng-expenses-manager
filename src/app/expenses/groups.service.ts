import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { Group } from './group.model';
import * as UI from '../shared/ui.actions';
import * as Groups from './groups.actions';
import * as fromGroups from './groups.reducer';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private store: Store<fromGroups.State>
  ) {}

  fetchGroups() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db
      .collection<Group>('groups')
      .snapshotChanges()
      .pipe(
        map(groups => {
          return groups.map(group => {
            const data = group.payload.doc.data();
            const id = group.payload.doc.id;
            return {
              id, ...data
            };
          });
        })
      )
      .subscribe(
        (groups: any) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Groups.SetGroups(groups));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
        }
      )
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  insertGroup(group) {
    this.db.collection('groups').add(group);
  }

  deleteGroup(group) {
    this.db.collection('groups').doc(group).delete()
      .then(()=> {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
