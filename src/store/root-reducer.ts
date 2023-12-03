import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import offersData from './offer-data/offer-data';
import {appProcess} from './app-process/app-process';
import userProcess from './users-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});

export default rootReducer;

