import { createAction } from '@reduxjs/toolkit';
import { ActiveCity } from '../types/city';
import { Favs, Offer, SelectedOffer } from '../types/offer';
import ReviewType from '../types/review';
import { AuthStatus } from '../const';

const setCity = createAction<{ city: ActiveCity }>('setCity');

const setOffers = createAction<Offer[]>('setOffers');
const favoritesNumber = createAction<number>('favoritesNumber');

const isLoaded = createAction<boolean>('loaded');

const setSelectedOffer = createAction<SelectedOffer>('data/setSelectedOffer');
const isSelectedOfferLoaded = createAction('selectedOfferLoaded');
const setFavs = createAction<Favs[]>('data/setFavs');
const isFavsLoaded = createAction('favsLoaded');
const setNearPlaces = createAction<Offer[]>('data/setNearPlaces');
const isNearPlacesLoaded = createAction('nearPlacesLoaded');
const setReviews = createAction<ReviewType[]>('data/setReviews');
const isReviewsLoaded = createAction('reviewsLoaded');

const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');


export {
  setCity,
  setOffers,
  favoritesNumber,
  isLoaded,
  setSelectedOffer,
  isSelectedOfferLoaded,
  setFavs,
  isFavsLoaded,
  setNearPlaces,
  isNearPlacesLoaded,
  setReviews,
  isReviewsLoaded,
  requireAuthorization,
};
