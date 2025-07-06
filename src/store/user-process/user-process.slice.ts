import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const';
import {InitialState} from '../../types/state';
import {checkAuthorizationAction, loginAction, logoutAction} from '../api-action';

const initialState: Pick<InitialState, 'authorizationStatus' | 'user'> = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthorizationAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthorizationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});

export {userProcess};
