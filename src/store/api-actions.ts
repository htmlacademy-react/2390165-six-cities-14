import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { APIRoute } from '../const';
import { isLoaded, setOffers } from './actions';
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
    setTimeout(() => dispatch(isLoaded(true)), 500) ;
  },
);


export {
  fetchOffersAction,
};
