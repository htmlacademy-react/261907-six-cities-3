import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user';

function getAuthorizationStatus(state: State): AuthorizationStatus {
  return state[NameSpace.User].authorizationStatus;
}

function getUser(state: State): UserData | null {
  return state[NameSpace.User].user;
}

export {
  getAuthorizationStatus,
  getUser
};
