import { Action } from '@ngrx/store';

import { Expense } from './expense.model';

export const GET_EXPENSES = '[Expense] Get expenses';
export const INSERT_EXPENSE = '[Expense] Insert expense';

export class GetExpenses implements Action {
  readonly type = GET_EXPENSES;

  constructor(public payload: Expense[]) {}
}

export class InsertExpense implements Action {
  readonly type = INSERT_EXPENSE;

  constructor(public payload: Expense[]) {}
}

export type ExpensesActions =
  | GetExpenses
  | InsertExpense;
