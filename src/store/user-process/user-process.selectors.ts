import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user';

function getAuthorizationStatus(state: Pick<State, NameSpace.User>): AuthorizationStatus {
  return state[NameSpace.User].authorizationStatus;
}

function getUser(state: Pick<State, NameSpace.User>): UserData | null {
  return state[NameSpace.User].user;
}

export {
  getAuthorizationStatus,
  getUser
};
