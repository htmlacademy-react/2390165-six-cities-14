import Cities from '../../components/cities/cities';
import Filter from '../../components/filter/filter';
import { ActiveCity } from '../../types/city';

import { Offer } from '../../types/offer';
import {useState} from 'react';

type MainPageProps = {
  offers: Array<Offer>;
}

function MainPage({ offers }: MainPageProps): JSX.Element {
  const [filterValue, setFilterValue] = useState<ActiveCity>('Paris') ;
  const offersByCities = offers.filter((offer) => offer.city.name === filterValue);

  return (

    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Filter cb={setFilterValue} />
          </section>
        </div>
        <Cities offers={offersByCities} selectedCity={filterValue} />
      </main>
    </div>

  );
}

export default MainPage;
