import { clsx } from 'clsx';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch } from '@/hooks/store/use-app-dispatch';
import { useAppSelector } from '@/hooks/store/use-app-selector';
import useLoading from '@/hooks/use-loading';
import {
  fetchFavoriteOffersAction,
  getAllFavorites,
} from '@/store/modules/favorite';

import Footer from '@/components/common/footer/footer';
import { Header } from '@/components/common/header/header';
import Loader from '@/components/common/loader/loader';
import FavoritesEmpty from '~/favorites/favorites-empty/favorites-empty';
import FavoritesList from '~/favorites/favorites-list/favorites-list';

function FavoritesPage(): JSX.Element {
  const places = useAppSelector(getAllFavorites);
  const dispatch = useAppDispatch();
  const { isLoading, disableLoading } = useLoading();
  const hasPlaces = !!places.length;

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());

    disableLoading();
  }, [dispatch, disableLoading]);

  return (
    <div className={clsx('page', !hasPlaces && 'page--favorites-empty')}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />

          <main
            className={clsx(
              'page__main',
              'page__main--favorites',
              !hasPlaces && 'page__main--favorites-empty'
            )}
          >
            <div className="page__favorites-container container">
              {hasPlaces ? (
                <FavoritesList places={places} />
              ) : (
                <FavoritesEmpty />
              )}
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default FavoritesPage;
