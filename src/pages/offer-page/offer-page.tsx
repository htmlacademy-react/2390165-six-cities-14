import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

import { AppRoute, CITIES_LOCATION } from '../../const';
import Map from '../../components/map/map';
import OfferDetails from '../../components/offer-details/offer-details';
import NearPlaces from '../../components/near-places/near-places';


import { Offer } from '../../types/offer';
import { ActiveCity } from '../../types/city';

type OfferPageProps = {
  offers: Array<Offer>;
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { offerId } = useParams();
  const selectedOffer: Offer | undefined = offers.find((it) => it.id === Number(offerId));

  if (!selectedOffer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const selectedCityName: ActiveCity =
    offers.find((offer) => offer.id === Number(offerId))?.city.name || 'Paris';

  const offersByCity: Array<Offer> = offers.filter((offer) =>
    (offer.city.name === selectedOffer.city.name));

  const nearOffers: Array<Offer> = offersByCity
    .filter((offer) => offer.id !== Number(offerId))
    .slice(0, 3);

  const onMapOffers = [...nearOffers];
  onMapOffers.push(selectedOffer);


  return (

    <div className="page">
      <Helmet>
        <title>{'6 cities - offer'}</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails selectedOffer={selectedOffer} />
          <Map
            mapType={'offer'}
            cityLocations={CITIES_LOCATION}
            offers={onMapOffers}
            activeCity={selectedCityName}
            selectedOffer={selectedOffer}
          />
        </section>
        <div className="container">
          <NearPlaces upcomingOffers={nearOffers} />
        </div>
      </main>
    </div>

  );
}

export default OfferPage;
