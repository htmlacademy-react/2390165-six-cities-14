import { useState } from 'react';

import CardList from '../card-list/card-list';
import Map from '../map/map';

import { CITIES_LOCATION } from '../../const';

import Sort from '../sort/sort';

import { ActiveCity } from '../../types/city';
import {Offer} from '../../types/offer';
import { SortType } from '../../types/sort';

type CitiesProps = {
  offers: Array<Offer>;
  selectedCity: ActiveCity;
}

function Cities({ offers, selectedCity }: CitiesProps): JSX.Element {
  const [hoveredOfferId, setHoveredOfferId] = useState<Offer['id'] | null>(null);
  const [sortItem, setSortItem] = useState<SortType>('Popular');

  const sortCallbacks: Record<SortType, (a: Offer, b: Offer) => number > = {
    'Popular': () => 0,
    'Price: low to high': (a, b) => a.price - b.price,
    'Price: high to low': (a, b) => b.price - a.price,
    'Top rated first': (a, b) => b.rating - a.rating,
  };
  const defaultSort = sortCallbacks['Popular'];
  const sort = sortCallbacks[sortItem] ?? defaultSort;
  const sortedOffers = offers.sort(sort);

  function handleCardHover(offerId: Offer['id'] | null) {
    setHoveredOfferId(offerId);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
          <Sort cb={setSortItem}/>
          <div className="cities__places-list places__list tabs__content">
            <CardList
              elementType={'cities'}
              offers={sortedOffers}
              onCardHover={handleCardHover}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map mapType={'cities'} cityLocations={CITIES_LOCATION} offers={offers} hoveredOfferId={hoveredOfferId} activeCity={selectedCity} />
        </div>
      </div>
    </div>
  );
}

export default Cities;
