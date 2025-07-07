import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const';
import {InitialState} from '../../types/state';
import {checkAuthorizationAction, loginAction, logoutAction} from '../api-action';

const initialState: Pick<InitialState, 'authorizationStatus' | 'isUserProcessing' | 'user'> = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isUserProcessing: false
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
      .addCase(loginAction.pending, (state) => {
        state.isUserProcessing = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isUserProcessing = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isUserProcessing = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isUserProcessing = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isUserProcessing = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isUserProcessing = false;
      });
  },
});

export {userProcess};
