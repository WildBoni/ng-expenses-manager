import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromExpense from '../expenses.reducer';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.scss']
})
export class ExpenseViewComponent implements OnInit {
  expense: Expense;
  private expenseSub: Subscription;
  isLoading$: Observable<boolean>;
  expenseId: string;

  constructor(
    private expensesService: ExpensesService,
    private uiService: UIService,
    private store: Store<fromExpense.State>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('expenseId');
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.expensesService.fetchExpense(this.expenseId);
    this.expenseSub = this.store.select(fromExpense.getExpense)
      .subscribe((expense: Expense) => {
        this.expense = expense;
      });
  }

  onDelete(expense) {
    this.expensesService.deleteExpense(expense);
  }

}
