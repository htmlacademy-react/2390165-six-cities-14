import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/actions';

import Filters from '../../types/filters';
import { ActiveCity } from '../../types/city';

function Filter(): JSX.Element {
  const filters: Filters = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const dispatch = useAppDispatch();

  function handleClick(filter: ActiveCity) {
    return () => dispatch(setCity(filter));
  }

  return (
    <ul className="locations__list tabs__list">
      {filters.map((filter) => (
        <li
          key={filter}
          className="locations__item"
          onClick={handleClick(filter)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{filter}</span>
          </a>
        </li>
      ))}


    </ul>
  );
}

export default Filter;
