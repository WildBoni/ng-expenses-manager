import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  ExpensesActions,
  GET_EXPENSES,
  INSERT_EXPENSE
} from './expenses.actions';
import { Expense } from './expense.model';
import * as fromRoot from '../app.reducer';

export interface ExpensesState {
  expenses: Expense[];
  newExpense: Expense;
}

export interface State extends fromRoot.State {
  expenses: ExpensesState;
}

const initialState: ExpensesState = {
  expenses: [],
  newExpense: {
    id: '',
    title: '',
    amount: 0,
    creator: '',
    date: new Date(),
    description: ''
  }
};

export function expensesReducer(state = initialState, action: ExpensesActions) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case INSERT_EXPENSE:
      return {
        ...state,
        newExpense: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getExpensesState = createFeatureSelector<ExpensesState>('expense');

export const getExpenses = createSelector(getExpensesState, (state: ExpensesState) => state.expenses);
export const insertExpense = createSelector(getExpensesState, (state: ExpensesState) => state.newExpense);
