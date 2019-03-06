import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

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
  private expenseSub: Subscription;

  filterDate(start, end) {
    return this.expenses.filter(expense => {
      if(expense.date > start && expense.date < end) {
        return expense
      }
    });
  }

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesService.fetchExpenses();
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
