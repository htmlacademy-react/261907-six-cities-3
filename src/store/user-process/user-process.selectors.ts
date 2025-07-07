import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user';

function getAuthorizationStatus(state: Pick<State, NameSpace.User>): AuthorizationStatus {
  return state[NameSpace.User].authorizationStatus;
}

function getUser(state: Pick<State, NameSpace.User>): UserData | null {
  return state[NameSpace.User].user;
}

function getUserProcessing(state: Pick<State, NameSpace.User>): boolean {
  return state[NameSpace.User].isUserProcessing;
}

export {
  getAuthorizationStatus,
  getUser,
  getUserProcessing
};
