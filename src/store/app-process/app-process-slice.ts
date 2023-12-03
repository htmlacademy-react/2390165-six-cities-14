import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/Slices';
import { ActiveCity } from '../../types/city';
import { Offer } from '../../types/offer';

const initialState: AppProcess = {
  activeCity: 'Paris',
  favoritesNumber: 0,
  error: null,
  favs: [],
};

const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<{city: ActiveCity}>) => {
      const { city } = action.payload;
      state.activeCity = city;
    },
    favoritesNumber: (state, action: PayloadAction<number>) => {
      state.favoritesNumber = state.favoritesNumber + action.payload;
    },
    setError:  (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    dropFavOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.favs.findIndex((offer) => offer.id === action.payload.id);
      state.favs.splice(index, 1);
    },
  },
  extraReducers() {},
});

const {setCity, favoritesNumber, setError, dropFavOffer } = appProcess.actions;

export {appProcess,
  setCity,
  favoritesNumber,
  setError,
  dropFavOffer
};
