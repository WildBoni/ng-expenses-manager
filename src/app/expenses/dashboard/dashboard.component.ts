import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  start = new Date('2019-02-01');
  end = new Date('2019-03-08');
  expenses: Expense[] = [];
  isLoading$: Observable<boolean>;
  private expenseSub: Subscription;

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
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.expensesService.fetchExpenses();
    // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.expenseSub = this.expensesService.getExpensesListener()
      .subscribe((expenses: Expense[]) => {
        this.expenses = expenses;
        let pippo = this.filterDate(this.start, this.end);
        console.log(pippo);
      })
  }

  ngOnDestroy() {
    this.expenseSub.unsubscribe();
  }

}
