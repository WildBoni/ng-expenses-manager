import { Action, createSelector } from '@ngrx/store';
import { User } from './user.model';

import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USERID,
  SET_USERS
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  currentUser: User;
  users: User[];
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: {
    id: "",
    name: "",
    email: "",
    photo: ""
  },
  users: []
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case SET_USERID:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUsers = (state: State) => state.users;
export const getUser = (state: State) => state.currentUser;
