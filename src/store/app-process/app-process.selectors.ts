import {NameSpace} from '../../const';
import {State} from '../../types/state';

function getCity(state: State): string {
  return state[NameSpace.App].city;
}

export {
  getCity
};
