import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { AppRoute, CITIES_LOCATION } from '../../const';
import Map from '../../components/map/map';
import OfferDetails from '../../components/offer-details/offer-details';
import NearPlaces from '../../components/near-places/near-places';


import { Offer } from '../../types/offer';
import { ActiveCity, CityLocationType } from '../../types/city';

type OfferPageProps = {
  offers: Array<Offer>;
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { offerId } = useParams();
  const selectedOffer = offers.find((it) => it.id === Number(offerId));
  const [upcomingOfferId, setUpcomingOfferId] = useState<Offer['id'] | null>(null);

  function handleCardHover(nearOfferId: Offer['id'] | null) {
    setUpcomingOfferId(nearOfferId);
  }

  if (!selectedOffer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const selectedCityName: ActiveCity | undefined =
    offers.find((offer) => offer.id === Number(offerId))?.city.name;
  const selectedCityData: CityLocationType | undefined = CITIES_LOCATION.find((city) => city?.title === selectedCityName) ;
  const nearOffers: Array<Offer> = offers.filter((offer) =>
    (offer.city.name === selectedOffer.city.name) &&
    (offer.id !== Number(offerId))
  )
    .slice(0, 3);

  return (

    <div className="page">
      <Helmet>
        <title>{'6 cities - offer'}</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails selectedOffer={selectedOffer} />
          <Map mapType={'offer'} cityLocations={selectedCityData} offers={nearOffers} hoveredOfferId={upcomingOfferId} />
        </section>
        <div className="container">
          <NearPlaces upcomingOffers={nearOffers} hoveredOfferId={handleCardHover} />
        </div>
      </main>
    </div>

  );
}

export default OfferPage;
