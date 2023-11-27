import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { isLoaded, requireAuthorization, setError, setOffers } from './actions';
import { dropToken, saveToken } from '../services/apiService/token';

import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';


const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api, }) => {
    dispatch(isLoaded(false));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    setTimeout(() => dispatch(isLoaded(true)), 500);
  },
);

const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/chekAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  });

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    const token = data.token;
    saveToken(token);
    dispatch(requireAuthorization(AuthStatus.Auth));
  });

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  });

const clearErrorAction = createAsyncThunk('app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  });


export {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  clearErrorAction,
};
