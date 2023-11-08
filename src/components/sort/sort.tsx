import { useState } from 'react';

function Sort(): JSX.Element {
  const values = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
  const items = values.map((value) => ({
    value,
    isSelected: false
  }));

  const [state, setState] = useState(items);
  const [ulClassName, setUlClassName] = useState('places__options--closed');

  function handleUlClick() {
    setUlClassName('places__options--opened');
  }

  function handleLiClick(event: React.MouseEvent<HTMLLIElement> & { target: HTMLLIElement }) {
    const selectedElement = event.target;
    items.forEach((it) => (it.isSelected = selectedElement.textContent === it.value));

    setUlClassName('places__options--closed');
    setState(items);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleUlClick}
      >
        {state.find((item) => item.isSelected)?.value || 'Popular'}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${ulClassName}`}

      >
        {
          state.map((item) => (
            <li
              key={item.value}
              className={`places__option ${item.isSelected ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={handleLiClick}
            >
              {item.value}
            </li>
          ))
        }

      </ul>
    </form>
  );
}

export default Sort;
