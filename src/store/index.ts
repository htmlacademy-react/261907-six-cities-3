import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api';
import {reducer} from './reduser';

const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export {store};
