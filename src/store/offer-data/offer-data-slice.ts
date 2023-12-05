import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingDataStatus, NameSpace } from '../../const';
import { fetchFavoritesAction, fetchOffersAction, fetchSelectedOfferDataAction, postFavStatusAction } from '../api-actions';
import { OffersData } from '../../types/sliceTypes';
import ReviewType from '../../types/review';
import { Offer } from '../../types/offer';


const initialState: OffersData = {
  offers: [],
  isLoaded: false,
  hasError: false,

  selectedOffer: null,
  nearPlaces: [],
  reviews: [],

  isReviewSending: false,

  favs: [],
  favsLoadingStatus: LoadingDataStatus.Unsent
};

const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    isReviewSending: (state, action: PayloadAction<boolean>) => {
      state.isReviewSending = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    dropFavOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.favs.findIndex((offer) => offer.id === action.payload.id);
      state.favs.splice(index, 1);
    },
    addFavOffer:(state, action: PayloadAction<Offer>) => {
      state.favs.push(action.payload);
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      const offer = action.payload;

      const items = state.offers.map((it: Offer) => {
        if (it.id === offer.id) {
          it.isFavorite = !it.isFavorite;
        }

        return it;
      });
      state.offers = items;
    },
    dropAllFavorites: (state) => {
      state.favs = [];
    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoaded = false;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoaded = true;
        state.hasError = true;
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
        state.favsLoadingStatus = LoadingDataStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favsLoadingStatus = LoadingDataStatus.Success;
        state.favs = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favsLoadingStatus = LoadingDataStatus.Error;
      })
      .addCase(postFavStatusAction.fulfilled, (state) => {
        state.favsLoadingStatus = LoadingDataStatus.Success;

      });
  }
});

const { updateOffers, dropAllFavorites, isReviewSending, setReviews, setIsLoaded, setOffers, dropFavOffer, addFavOffer} = offersData.actions;

export {
  offersData,
  updateOffers,
  dropAllFavorites,

  isReviewSending,
  setReviews,
  setIsLoaded,
  setOffers,
  dropFavOffer,
  addFavOffer,
};
