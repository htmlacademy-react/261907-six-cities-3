import {datatype} from 'faker';
import {CITIES} from '../../const';
import {appProcess, changeCityAction} from './app-process.slice';

describe('App Process Slice', () => {
  const emptyAction = {type: ''};

  it('should return initial state with empty action', () => {
    const state = {
      city: CITIES[datatype.number(5)]
    };

    const result = appProcess.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const initialState = {
      city: CITIES[0]
    };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with changeCity action', () => {
    const expectedState = {
      city: CITIES[3]
    };

    const result = appProcess.reducer(undefined, changeCityAction(CITIES[3]));

    expect(result).toEqual(expectedState);
  });
});
