
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';

import { map } from 'rxjs/operators';

import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expense = new Subject<Expense>();
  expenses = new Subject<Expense[]>();
  private availableExpenses: Expense[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchExpenses() {
    this.fbSubs.push(this.db
      .collection('expenses')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              // name: doc.payload.doc.data().name,
              // amount: doc.payload.doc.data().amount
            };
          });
        })
      )
      .subscribe((expenses: Expense[]) => {
        this.availableExpenses = expenses;
        this.expenses.next([...this.availableExpenses]);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(expense: Expense) {
    this.db.collection('expenses').add(expense);
  }
}
