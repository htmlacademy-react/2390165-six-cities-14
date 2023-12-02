import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchFavoritesAction, fetchOffersAction, fetchSelectedOfferDataAction } from '../api-actions';
import { OffersData } from '../../types/Slices';


const initialState: OffersData = {
  offers: [],
  isLoaded: false,

  selectedOffer: null,
  nearPlaces: [],
  reviews: [],

  favs: [],
};

const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoaded = true;
      })

      .addCase(fetchSelectedOfferDataAction.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchSelectedOfferDataAction.fulfilled, (state, action) => {
        const [selectedOffer, nearbyOffers, comments] = action.payload;
        state.selectedOffer = selectedOffer;
        state.nearPlaces = nearbyOffers;
        state.reviews = comments;

        state.isLoaded = true;
      })
      .addCase(fetchSelectedOfferDataAction.rejected, (state) => {
        state.isLoaded = true;
      })

      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favs = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoaded = true;
      });

  },
});

export default offersData;

