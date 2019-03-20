import { Action } from '@ngrx/store';

import { Group } from './group.model';

export const SET_GROUPS = '[Group] Set groups';
export const INSERT_GROUP = '[Group] Insert group';

export class SetGroups implements Action {
  readonly type = SET_GROUPS;

  constructor(public payload: Group[]) {}
}

export class InsertGroup implements Action {
  readonly type = INSERT_GROUP;

  constructor(public payload: Group) {}
}

export type GroupsActions =
  | SetGroups
  | InsertGroup;
