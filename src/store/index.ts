import {configureStore} from '@reduxjs/toolkit';
import {createApi} from '../services/api';
import {rootReducer} from './root-reducer';
import {redirect} from './middleware/redirect';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

export {
  api,
  store
};
