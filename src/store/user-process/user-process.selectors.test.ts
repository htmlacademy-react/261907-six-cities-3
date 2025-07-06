import {AuthorizationStatus, NameSpace} from '../../const';
import {makeMockUser} from '../../utils/mocks';
import {getAuthorizationStatus, getUser} from './user-process.selectors';

describe('User Process Selectors', () => {
  const mockUser = makeMockUser();

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
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
});
