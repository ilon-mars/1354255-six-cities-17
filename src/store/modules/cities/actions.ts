import { createAction } from '@reduxjs/toolkit';

import { CityValue } from '@/types/city';
import { ValueOf } from '@/types/helpers';
import { OfferCard } from '@/types/offer';
import { FeatureModule, SortType } from '@/utils/consts';

const Action = {
  loadOffers: `${FeatureModule.CITIES}/loadOffers`,
  setCurrentCity: `${FeatureModule.CITIES}/setCurrentCity`,
  setCurrentSort: `${FeatureModule.CITIES}/setCurrentSort`,
} as const;

const loadOffers = createAction<OfferCard[]>(Action.loadOffers);

const setCurrentCity = createAction<CityValue>(Action.setCurrentCity);

const setCurrentSort = createAction<ValueOf<typeof SortType>>(
  Action.setCurrentSort
);

export { loadOffers, setCurrentCity, setCurrentSort };
