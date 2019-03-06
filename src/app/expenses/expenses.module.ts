import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AngularMaterialModule } from '../angular-material.module';

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
    AngularMaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule
  ]
})

export class ExpensesModule { }
