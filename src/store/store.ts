import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '@/service/api';
import { reducer } from './reducer';

const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { api, store };
