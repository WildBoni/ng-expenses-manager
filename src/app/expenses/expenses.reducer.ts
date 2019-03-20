import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  ExpensesActions,
  SET_EXPENSES,
  SET_EXPENSE,
  INSERT_EXPENSE
} from './expenses.actions';
import { Expense } from './expense.model';
import * as fromRoot from '../app.reducer';

export interface ExpensesState {
  expenses: Expense[];
  currentExpense: Expense;
  newExpense: Expense;
}

export interface State extends fromRoot.State {
  expense: ExpensesState;
}

const initialState: ExpensesState = {
  expenses: [],
  currentExpense: {
    id: '',
    title: '',
    amount: 0,
    creator: '',
    group: '',
    date: new Date(),
    description: ''
  },
  newExpense: {
    id: '',
    title: '',
    amount: 0,
    creator: '',
    group: '',
    date: new Date(),
    description: ''
  }
};

export function expensesReducer(state = initialState, action: ExpensesActions) {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case SET_EXPENSE:
      return {
        ...state,
        currentExpense: action.payload
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
export const getExpense = createSelector(getExpensesState, (state: ExpensesState) => state.currentExpense );
// export const insertExpense = createSelector(getExpensesState, (state: ExpensesState) => state.newExpense);
