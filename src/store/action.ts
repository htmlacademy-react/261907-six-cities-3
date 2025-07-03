import {createAction} from '@reduxjs/toolkit';
import {Sorting} from '../const';
import {Offer} from '../types/offer';

const changeCityAction = createAction<{city: string}>('changeCity');

const changeSortingAction = createAction<{sorting: typeof Sorting[keyof typeof Sorting]}>('changeSorting');

const renderOffersAction = createAction<{offersToRender: Offer[]}>('renderOffers');

export {
  changeCityAction,
  changeSortingAction,
  renderOffersAction
};
