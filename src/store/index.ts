import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api';
import {reducer} from './reduser';
import {redirect} from './middleware/redirect';

const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

export {store};
