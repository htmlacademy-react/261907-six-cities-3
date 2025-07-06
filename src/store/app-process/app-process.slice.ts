import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES, NameSpace} from '../../const';
import {InitialState} from '../../types/state';

const initialState: Pick<InitialState, 'city'> = {
  city: CITIES[0]
};

const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCityAction: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  }
});

const {changeCityAction} = appProcess.actions;

export {
  appProcess,
  changeCityAction
};
