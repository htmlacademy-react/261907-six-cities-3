import {internet} from 'faker';
import {AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user';
import {makeMockUser} from '../../utils/mocks';
import {checkAuthorizationAction, loginAction, logoutAction} from '../api-action';
import {userProcess} from './user-process.slice';

describe('User Process Slice', () => {
  const emptyAction = {type: ''};
  const mockUser: UserData = makeMockUser();

  it('should return initial state with empty action', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: false,
      user: mockUser
    };

    const result = userProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isUserProcessing: false,
      user: null
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set Auth and user with checkAuthorizationAction.fulfilled', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: false,
      user: mockUser
    };

    const result = userProcess.reducer(undefined, checkAuthorizationAction.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth with checkAuthorizationAction.rejected', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isUserProcessing: false,
      user: null
    };

    const result = userProcess.reducer(undefined, checkAuthorizationAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isUserProcessing to true with loginAction.pending', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isUserProcessing: false,
      user: null
    };

    const expectedState = {
      ...state,
      isUserProcessing: true
    };

    const result = userProcess.reducer(state, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isUserProcessing to false, Auth, and user with loginAction.fulfilled', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: false,
      user: mockUser
    };

    const result = userProcess.reducer(undefined, loginAction.fulfilled(mockUser, '', {email: mockUser.email, password: internet.password()}));

    expect(result).toEqual(expectedState);
  });

  it('should set is isUserProcessing to false and NoAuth with loginAction.rejected', () => {
    const pendingState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isUserProcessing: true,
      user: null
    };

    const expectedState = {
      ...pendingState,
      isUserProcessing: false
    };

    const result = userProcess.reducer(pendingState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isUserProcessing to true with logoutAction.pending', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: false,
      user: mockUser
    };

    const expectedState = {
      ...state,
      isUserProcessing: true
    };

    const result = userProcess.reducer(state, logoutAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isUserProcessing to false, NoAuth, and user to null with logoutAction.fulfilled', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isUserProcessing: false,
      user: null
    };

    const result = userProcess.reducer(undefined, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set is isUserProcessing to false with logoutAction.rejected', () => {
    const pendingState = {
      authorizationStatus: AuthorizationStatus.Auth,
      isUserProcessing: true,
      user: mockUser
    };

    const expectedState = {
      ...pendingState,
      isUserProcessing: false
    };

    const result = userProcess.reducer(pendingState, logoutAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
