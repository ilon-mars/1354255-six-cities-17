import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@/hooks/store/use-app-dispatch';
import { useAppSelector } from '@/hooks/store/use-app-selector';
import { getCurrentSort, setCurrentSort } from '@/store/modules/cities';

import { SortType } from '@/utils/consts';

function CitiesPlacesSorting(): JSX.Element {
  const sortSpanRef = useRef<HTMLElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getCurrentSort);

  const handleSortClick = () => setIsMenuOpened((prevState) => !prevState);

  const hideSortList = (evt: Event) => {
    if (
      evt.target instanceof HTMLElement &&
      sortSpanRef.current &&
      !sortSpanRef.current.contains(evt.target)
    ) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideSortList);

    return () => document.removeEventListener('click', hideSortList);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        ref={sortSpanRef}
        tabIndex={0}
        onClick={handleSortClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={clsx(
          'places__options',
          'places__options--custom',
          isMenuOpened && 'places__options--opened'
        )}
      >
        {Object.values(SortType).map((option) => (
          <li
            className={clsx(
              'places__option',
              currentSort === option && 'places__option--active'
            )}
            tabIndex={0}
            key={option}
            onClick={() => dispatch(setCurrentSort(option))}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default CitiesPlacesSorting;
