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

  fetchExpenses(id) {
    const groupId = id;
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db
      .collection('expenses')
      .snapshotChanges()
      .pipe(
        map(expenses => {
          return expenses.map(expense => {
            const data = expense.payload.doc.data();
            const id = expense.payload.doc.id;
            return {
              id, ...data
            };
          });
        })
      )
      .subscribe(
        (expenses: Expense[]) => {
          const groupExpenses = expenses.filter(expense => expense.group == groupId);
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Expenses.SetExpenses(groupExpenses));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
        }
      )
    );
  }

  fetchExpense(id) {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('expenses')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map(expense => {
          const data = expense.payload.data();
          const id = expense.payload.id;
          return {
            id, ...data
          };
        })
      )
      .subscribe(
        (expense: Expense) => {
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new Expenses.SetExpense(expense));
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
