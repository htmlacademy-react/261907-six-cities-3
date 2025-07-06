import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

export {
  redirectToRouteAction
};
