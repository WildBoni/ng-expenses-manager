import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
GroupsActions,
  SET_GROUPS,
  INSERT_GROUP
} from './groups.actions';
import { Group } from './group.model';
import * as fromRoot from '../app.reducer';

export interface GroupsState {
  groups: Group[];
  newGroup: Group;
}

export interface State extends fromRoot.State {
  group: GroupsState;
}

const initialState: GroupsState = {
  groups: [],
  newGroup: {
    id: '',
    title: '',
    description: '',
    expenses: [''],
    users: ['']
  }
};

export function groupsReducer(state = initialState, action: GroupsActions) {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };
    case INSERT_GROUP:
      return {
        ...state,
        newGroup: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getGroupsState = createFeatureSelector<GroupsState>('group');

export const getGroups = createSelector(getGroupsState, (state: GroupsState) => state.groups);
// export const insertExpense = createSelector(getExpensesState, (state: ExpensesState) => state.newExpense);
