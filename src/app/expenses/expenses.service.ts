import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { Expense } from './expense.model';
import * as UI from '../shared/ui.actions';
import * as Expenses from './expenses.actions';
import * as fromExpenses from './expenses.reducer';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private store: Store<fromExpenses.State>
  ) {}

  fetchExpenses() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db
      .collection('expenses')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            let date = doc.payload.doc.data()['date'].toDate();
            return {
              id: doc.payload.doc.id,
              title: doc.payload.doc.data()['title'],
              amount: doc.payload.doc.data()['amount'],
              creator: doc.payload.doc.data()['creator'],
              date: date,
              description: doc.payload.doc.data()['description']
            };
          });
        })
      )
      .subscribe(
        (expenses: Expense[]) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Expenses.SetExpenses(expenses));
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

  insertExpense(expense) {
    this.db.collection('expenses').add(expense);
  }

  deleteExpense(expense) {
    this.db.collection('expenses').doc(expense).delete()
      .then(()=> {
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
