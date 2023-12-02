import { createSlice } from '@reduxjs/toolkit';

import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthStatus, NameSpace } from '../../const';

import { UserProcess } from '../../types/process';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })

      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  }
});

export default userProcess;

