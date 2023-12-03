import { createReducer } from '@reduxjs/toolkit';

import { setFavs, setNearPlaces, setSelectedOffer, setReviews,
  isLoaded, setCity, setOffers,
  isReviewSending, favoritesNumber, requireAuthorization,
  setError, setUserData, dropFavOffer } from './actions';
import { AuthStatus } from '../const';

import { ActiveCity } from '../types/city';
import { Favorite, Offer, SelectedOffer } from '../types/offer';
import ReviewType from '../types/review';
import { UserData } from '../types/user-data';

export type InitialState = {
  activeCity: ActiveCity;
  favoritesNumber: number;

  offers: Array<Offer>;
  isLoaded: boolean;
  error: string | null;

  selectedOffer: SelectedOffer | null;

  favs: Favorite[];

  nearPlaces: Offer[];

  reviews: ReviewType[];
  isReviewSending: boolean;

  authStatus: AuthStatus;
  UserData: UserData | null;
}
const initialState: InitialState = {
  activeCity: 'Paris',
  favoritesNumber: 0,

  offers: [],
  isLoaded: false,
  error: null,

  selectedOffer: null,

  favs: [],

  nearPlaces: [],

  reviews: [],
  isReviewSending: false,

  authStatus: AuthStatus.Unknown,
  UserData: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const { city } = action.payload;
      state.activeCity = city;
    })
    .addCase(favoritesNumber, (state, action) => {
      state.favoritesNumber = state.favoritesNumber + action.payload;
    })

    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(isLoaded, (state, action) => {
      state.isLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })

    .addCase(setFavs, (state, action) => {
      state.favs = action.payload;
    })
    .addCase(dropFavOffer, (state, action) => {
      const index = state.favs.findIndex((offer) => offer.id === action.payload.id);
      state.favs.splice(index, 1);
    })

    .addCase(setNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })

    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(isReviewSending, (state, action) => {
      state.isReviewSending = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.UserData = action.payload;
    });
});

export default reducer;
