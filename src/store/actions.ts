import { createAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../const';

import { Favorite, Offer, SelectedOffer } from '../types/offer';
import { ActiveCity } from '../types/city';
import ReviewType from '../types/review';
import { UserData } from '../types/user-data';

const setCity = createAction<{ city: ActiveCity }>('setCity');

const favoritesNumber = createAction<number>('favoritesNumber');

const setOffers = createAction<Offer[]>('setOffers');
const isLoaded = createAction<boolean>('loaded');
const setError = createAction<string | null>('setError');

const setSelectedOffer = createAction<SelectedOffer>('data/setSelectedOffer');

const setFavs = createAction<Favorite[]>('data/setFavs');
const dropFavOffer = createAction<Offer>('data/dropFavOffer');

const setNearPlaces = createAction<Offer[]>('data/setNearPlaces');

const setReviews = createAction<ReviewType[]>('data/setReviews');
const isReviewSending = createAction<boolean>('reviewSending');

const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
const setUserData = createAction<UserData>('user/setUserData');

export {
  setCity,
  favoritesNumber,

  setOffers,
  isLoaded,
  setError,

  setSelectedOffer,

  setFavs,
  dropFavOffer,

  setNearPlaces,

  setReviews,
  isReviewSending,

  requireAuthorization,
  setUserData,
};
