import {createAction} from '@reduxjs/toolkit';

const changeCityAction = createAction<{city: string}>('changeCity');

export {
  changeCityAction
};
