import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { expensesReducer } from './expenses.reducer';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ExpenseCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('expense', expensesReducer)
  ]
})

export class ExpensesModule { }
