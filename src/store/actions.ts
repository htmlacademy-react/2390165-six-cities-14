/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAction } from '@reduxjs/toolkit';
import { ActiveCity } from '../types/city';

const setCity = createAction<{city: ActiveCity}>('setCity');

const setOffers = createAction('setOffers', (value) => (
  { payload: value }
));
const isLoaded = createAction('loaded');

export {
  setCity,
  setOffers,
  isLoaded
};
