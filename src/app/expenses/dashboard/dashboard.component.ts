import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromExpense from '../expenses.reducer';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  start = new Date('2019-02-01');
  end = new Date('2019-03-08');
  expenses: Expense[] = [];
  isLoading$: Observable<boolean>;
  expenses$:  Observable<Expense[]>;

  filterDate(start, end) {
    return this.expenses.filter(expense => {
      if(expense.date > start && expense.date < end) {
        return expense
      }
    });
  }

  constructor(
    private expensesService: ExpensesService,
    private uiService: UIService,
    private store: Store<fromExpense.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.expensesService.fetchExpenses();
    this.expenses$ = this.store.select(fromExpense.getExpenses);
  }

  onDelete(expense) {
    this.expensesService.deleteExpense(expense);
  }

}
