import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromExpense from '../expenses.reducer';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-group-expenses',
  templateUrl: './group-expenses.component.html',
  styleUrls: ['./group-expenses.component.scss']
})
export class GroupExpensesComponent implements OnInit {
  start = new Date('2019-02-01');
  end = new Date('2019-03-08');
  expenses: Expense[] = [];
  isLoading$: Observable<boolean>;
  expenses$:  Observable<Expense[]>;
  groupId: string;

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
    private store: Store<fromExpense.State>,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.expensesService.fetchExpenses(this.groupId);
    this.expenses$ = this.store.select(fromExpense.getExpenses);
  }

  onDelete(expense) {
    this.expensesService.deleteExpense(expense);
  }

}
