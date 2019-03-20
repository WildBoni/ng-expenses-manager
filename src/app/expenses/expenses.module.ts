import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { expensesReducer } from './expenses.reducer';
import { groupsReducer } from './groups.reducer';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { GroupExpensesComponent } from './group-expenses/group-expenses.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseViewComponent } from './expense-view/expense-view.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GroupComponent,
    GroupExpensesComponent,
    ExpenseCreateComponent,
    ExpenseViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('expense', expensesReducer),
    StoreModule.forFeature('group', groupsReducer)
  ]
})

export class ExpensesModule { }
