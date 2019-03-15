
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
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
  // expense = new Subject<Expense>();
  expenses = new Subject<Expense[]>();
  private availableExpenses: Expense[] = [];
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
            // let date = doc.payload.doc.data().date;
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
          this.availableExpenses = expenses;
          this.store.dispatch(new Expenses.GetExpenses(expenses));
        },
        error => {
          this.store.dispatch(new UI.StopLoading());
          this.expenses.next(null);
        }
      )
    );
  }

  getExpensesListener() {
    return this.expenses.asObservable();
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  insertExpense(expense) {
    // console.log(expense);
    this.db.collection('expenses').add(expense);
  }
}
