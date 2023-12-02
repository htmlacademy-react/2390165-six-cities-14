import { AuthStatus } from '../const';
import { State } from './state';
import { UserData } from './user-data';

type UserProcess = {
  authStatus: AuthStatus;
  userData: UserData;
}

type OffersData = Pick<State,
  'offers'
  | 'isLoaded'

  | 'selectedOffer'
  | 'nearPlaces'
  | 'reviews'

  | 'isReviewSending'

  | 'favs'
>

type AppProcess = Pick<State,
'activeCity'
|'favoritesNumber'
|'error'
|'favs'

>

export type {
  UserProcess,
  OffersData,
  AppProcess,
};
