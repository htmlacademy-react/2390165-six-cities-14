import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { APIRoute, AuthStatus } from '../const';
import { isLoaded, requireAuthorization, setOffers } from './actions';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';


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

export {
  fetchOffersAction,
  checkAuthAction,
};
