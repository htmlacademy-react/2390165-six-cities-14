import { AuthStatus } from '../const';
import { InitialState } from '../store/reducer';
import { ActiveCity } from './city';
import { Favorite, Offer, SelectedOffer } from './offer';
import ReviewType from './review';
import { State } from './state';
import { UserData } from './user-data';

type UserProcess = {
  authStatus: AuthStatus;
  userData: UserData;
}

type OffersData = Pick<InitialState,
  'offers'
  | 'isLoaded'

  | 'selectedOffer'
  | 'nearPlaces'
  | 'reviews'

  | 'isReviewSending'

  | 'favs'
>

// type OffersData = {
//   'offers': Offer[];
//   'isLoaded': boolean;

//   'selectedOffer': null | SelectedOffer;
//   'nearPlaces': Offer[];
//   'reviews': ReviewType[];

//   'isReviewSending': boolean;

//   'favs': Favorite[];
// }

type AppProcess = Pick<InitialState,
'activeCity'
|'favoritesNumber'
|'error'
|'favs'
>
// const obj: AppProcess = {

// }

// type AppProcess = {
//   'activeCity': ActiveCity;
//   'favoritesNumber': number;
//   'error': string | null;
//   'favs':

// }

export type {
  UserProcess,
  OffersData,
  AppProcess,
};
