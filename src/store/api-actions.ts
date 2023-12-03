import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
// import { isLoaded, requireAuthorization, setUserData, setError, setOffers, setSelectedOffer, setNearPlaces, setReviews, setFavs, favoritesNumber, dropFavOffer } from './actions';
import { dropToken, saveToken } from '../services/apiService/token';

import { AppDispatch, State, ThunkAPI } from '../types/state';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Favorite, Offer, SelectedOffer } from '../types/offer';
import ReviewType, { CommentSend } from '../types/review';
import { dropFavOffer, favoritesNumber, setError } from './app-process/app-process-slice';
import { setIsLoaded, setOffers } from './offer-data/offer-data-slice';


const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api, }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    const favNumbers = data.reduce((sum, item) => {
      const number = Number(item.isFavorite);
      return sum + number;
    }, 0);

    dispatch(favoritesNumber(favNumbers));

    return data;


    // try {
    // dispatch(isLoaded(false));

    // dispatch(setOffers(data));


    // setTimeout(() => dispatch(isLoaded(true)), 500);

    // } catch (error) {
    //   dispatch(setError(String(error)));
    //   throw error;
    // }
  }
);

const fetchFavoritesAction = createAsyncThunk<Favorite[], undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFavs',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Favorite[]>(APIRoute.Favorite);
    return data;

    //   try {
    //     // dispatch(isLoaded(false));
    //     dispatch(setFavs(data));
    //     dispatch(isLoaded(true));
    //   } catch (err) {
    //     if (err instanceof AxiosError) {
    //       dispatch(setError(String(err)));
    //       throw err;
    //     }
    //   }
  }
);

type SelectedOfferData = [SelectedOffer, Offer[], ReviewType[]]

const fetchSelectedOfferDataAction = createAsyncThunk<SelectedOfferData, string, {
  // dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchSelectedOfferData',
  async (offerId, { extra: api }) => {
    // dispatch(isLoaded(false));
    const offerPath = APIRoute.SelectedOffer + offerId;
    const nearbyPath = `${APIRoute.SelectedOffer}${offerId}/nearby`;
    const commentsPath = APIRoute.Reviews + offerId;

    const data = await Promise.all(
      [
        api.get<SelectedOffer>(offerPath),
        api.get<Offer[]>(nearbyPath),
        api.get<ReviewType[]>(commentsPath),
      ]
    );
    const list = data.map((item) => item.data);
    return list;



    // try {

    //   dispatch(setSelectedOffer(selectedOffer.data));
    //   dispatch(setNearPlaces(nearbyOffers.data));
    //   dispatch(setReviews(comments.data));
    //   setTimeout(() => dispatch(isLoaded(true)), 500);

    // } catch (err) {
    //   if (err instanceof AxiosError) {
    //     dispatch(setError(String(err)));
    //     throw err;
    //   }
    // }
  }
);

const postCommentAction = createAsyncThunk<
  ReviewType,
  { reviewData: CommentSend; offerId: string | undefined },
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/postReview',
  async ({ reviewData, offerId }, { dispatch, extra: api }) => {
    setTimeout(() => {
      dispatch(setIsLoaded(false));
    }, 2000);
    const path = APIRoute.Reviews + offerId;
    const { data } = await api.post<ReviewType>(path, reviewData);
    setTimeout(() => dispatch(setIsLoaded(true)), 2000);
    return data;
  }
);


const postFavStatusAction = createAsyncThunk<
  void,
  { offerId: string | undefined; status: number }, ThunkAPI
>('user/postFavStatus',
  async ({ offerId, status }, { dispatch, getState, extra: api }) => {
    const path = `${APIRoute.Favorite}/${offerId}/${status}`;
    const { data } = await api.post<Favorite>(path);

    const { DATA } = getState();
    const offers: Offer[] = DATA.offers;
    console.log(DATA)
    const offersCopy = structuredClone(offers);
    const index = offersCopy.findIndex((offer) => offer.id === data.id);
    console.log(index)
    offersCopy.splice(index, 1, data);

    dispatch(setOffers(offersCopy));

    if (status === 0) {
      dispatch(dropFavOffer(data));
    }

  }
);

const checkAuthAction = createAsyncThunk<UserData, undefined, {
  // dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;

    // try {
    // dispatch(requireAuthorization(AuthStatus.Auth));
    // dispatch(setUserData(data));
    // } catch {
    // dispatch(requireAuthorization(AuthStatus.NoAuth));
    // }
  });

const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    if (data) {
      const token = data.token;
      saveToken(token);
      // dispatch(requireAuthorization(AuthStatus.Auth));
      // dispatch(setUserData(data));
      dispatch(fetchOffersAction());
    }
    return data;
  });

const logoutAction = createAsyncThunk<void, undefined, {
  // dispatch: AppDispatch;
  extra: AxiosInstance;
}>('user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    // dispatch(requireAuthorization(AuthStatus.NoAuth));
    // dispatch(setUserData(null));
  });

const clearErrorAction = createAsyncThunk('app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  });


export {
  fetchOffersAction,
  fetchFavoritesAction,
  fetchSelectedOfferDataAction,
  postCommentAction,
  postFavStatusAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  clearErrorAction,
};
