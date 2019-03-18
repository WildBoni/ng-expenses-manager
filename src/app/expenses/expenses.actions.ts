import { Action } from '@ngrx/store';

import { Expense } from './expense.model';

export const SET_EXPENSES = '[Expense] Set expenses';
export const INSERT_EXPENSE = '[Expense] Insert expense';

export class SetExpenses implements Action {
  readonly type = SET_EXPENSES;

  constructor(public payload: Expense[]) {}
}

export class InsertExpense implements Action {
  readonly type = INSERT_EXPENSE;

  constructor(public payload: Expense[]) {}
}

export type ExpensesActions =
  | SetExpenses
  | InsertExpense;
