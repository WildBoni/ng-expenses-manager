import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Expense } from '../expense.model';
import { ExpensesService } from '../expenses.service';
import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss']
})
export class ExpenseCreateComponent implements OnInit {
  expense: Expense;
  private userIdSub: Subscription;
  expenseForm: FormGroup;
  userId: string;

  constructor(
    private expensesService: ExpensesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.userIdSub = this.store.select(fromRoot.getUser)
      .subscribe((user) => {
        this.userId = user.id;
      });
      console.log(this.userId);
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', Validators.pattern("^[0-9].*$")],
      date: [new Date(), Validators.required],
      description: ['']
    });
  }

  onAddExpense(form: NgForm) {
    if(this.expenseForm.invalid) {
      return;
    }
    let expense = {
      title: this.expenseForm.value.title,
      amount: this.expenseForm.value.amount,
      date: this.expenseForm.value.date,
      description: this.expenseForm.value.description,
      creator: this.userId
    }
    this.expensesService.insertExpense(expense);
    form.reset();
  }

}
