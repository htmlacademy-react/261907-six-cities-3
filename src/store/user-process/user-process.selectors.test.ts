import {datatype} from 'faker';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeMockUser} from '../../utils/mocks';
import {getAuthorizationStatus, getUser, getUserProcessing} from './user-process.selectors';

describe('User Process Selectors', () => {
  const mockUser = makeMockUser();

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: datatype.boolean(),
      user: mockUser
    }
  };

  it('should return authorization status from state', () => {
    const {authorizationStatus} = state[NameSpace.User];
    const result = getAuthorizationStatus(state);

    expect(result).toBe(authorizationStatus);
  });

  it('should return user from state', () => {
    const {user} = state[NameSpace.User];
    const result = getUser(state);

    expect(result).toEqual(user);
  });

  it('should return user processing status from state', () => {
    const {isUserProcessing} = state[NameSpace.User];
    const result = getUserProcessing(state);

    expect(result).toBe(isUserProcessing);
  });
});
