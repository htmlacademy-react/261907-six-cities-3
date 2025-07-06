import {datatype} from 'faker';
import {CITIES, NameSpace} from '../../const';
import {getCity} from './app-process.selectors';

describe('App Process Selectors', () => {
  it('should return city from state', () => {
    const state = {
      [NameSpace.App]: {
        city: CITIES[datatype.number(5)]
      }
    };

    const {city} = state[NameSpace.App];
    const result = getCity(state);

    expect(result).toBe(city);
  });
});
