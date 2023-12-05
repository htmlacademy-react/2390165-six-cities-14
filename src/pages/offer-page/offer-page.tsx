import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Map from '../../components/map/map';
import OfferDetails from '../../components/offer-details/offer-details';
import NearPlaces from '../../components/near-places/near-places';
import { useAppDispatch, useAppSelector } from '../../hooks';


import { PlaceHolder } from '../../components/placeholder/placeholder';
import { fetchSelectedOfferDataAction } from '../../store/api-actions';
import NotFound from '../404-page/404-page';
import { getIsLoaded, getNearPlaces, getSelectedOffer } from '../../store/offer-data/offer-data-selectors';


function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const nearOffers = useAppSelector(getNearPlaces);
  const selectedOffer = useAppSelector(getSelectedOffer);

  const isReady = useAppSelector(getIsLoaded);

  const { offerId } = useParams();
  useEffect(() => {
    if (offerId) {
      dispatch(fetchSelectedOfferDataAction(offerId));
    }
  }, [dispatch, offerId]);

  if (!offerId) {
    return <NotFound />;
  }

  const nearOffersCut = nearOffers.slice(0, 3);

  return (
    <>
      {(!isReady || !selectedOffer) && <PlaceHolder />}

      {isReady && selectedOffer &&
        <div className="page">
          <Helmet>
            <title>{'6 cities - offer'}</title>
          </Helmet>
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferDetails selectedOffer={selectedOffer} />
              <Map
                mapType={'offer'}
                offers={[...nearOffersCut, selectedOffer]}
                offerId={selectedOffer.id}
              />
            </section>
            <div className="container">
              <NearPlaces upcomingOffers={nearOffersCut} />
            </div>
          </main>
        </div>};
    </>
  );
}

export default OfferPage;
