import { clsx } from 'clsx';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch } from '@/hooks/store/use-app-dispatch';
import { useAppSelector } from '@/hooks/store/use-app-selector';
import useSelectedPoint from '@/hooks/use-selected-point';
import {
  fetchOffersAction,
  getCurrentCity,
  getPlaces,
} from '@/store/modules/cities';

import { Header } from '@/components/common/header/header';
import MapSection from '@/components/common/map-section/map-section';
import CitiesPlacesEmpty from '~/cities/cities-places-empty/cities-places-empty';
import CitiesPlaces from '~/cities/cities-places/cities-places';
import { CitiesTabs } from '~/cities/cities-tabs/cities-tabs';

import OfferApiService from '@/service/offer-api-service';
import { MapType } from '@/utils/consts';

function MainPage(): JSX.Element {
  const offerCards = useAppSelector(getPlaces);
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();
  const { selectedPointId, handleSelectedPointState } = useSelectedPoint();

  const places = OfferApiService.getOffersInCity(offerCards, currentCity);
  const hasPlaces = !!places.length;

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, currentCity]);

  return (
    <div
      className={clsx(
        'page',
        'page--gray',
        'page--main',
        !hasPlaces && 'page__main--index-empty'
      )}
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />

        <div className="cities">
          <div
            className={clsx(
              'cities__places-container',
              'container',
              !hasPlaces && 'cities__places-container--empty'
            )}
          >
            {hasPlaces ? (
              <CitiesPlaces
                places={places}
                onMouseOver={handleSelectedPointState}
                onMouseLeave={handleSelectedPointState}
              />
            ) : (
              <CitiesPlacesEmpty currentCity={currentCity} />
            )}

            <div className="cities__right-section">
              {hasPlaces && (
                <MapSection
                  type={MapType.Cities}
                  offers={places}
                  selectedOfferId={selectedPointId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
