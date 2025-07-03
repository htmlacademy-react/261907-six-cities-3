import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ERROR_TIMEOUT, ApiRoute} from '../const';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {loadOffersAction, setErrorAction, setOffersLoadingStatusAction} from './action';
import {store} from './';

const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(() => {
      store.dispatch(setErrorAction({error: null}));
    }, ERROR_TIMEOUT);
  }
);

const getOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatusAction({isOffersLoading: true}));

    const {data} = await api.get<Offer[]>(ApiRoute.Offers);

    dispatch(setOffersLoadingStatusAction({isOffersLoading: false}));
    dispatch(loadOffersAction({offers: data}));
  }
);

export {
  clearErrorAction,
  getOffersAction
};
