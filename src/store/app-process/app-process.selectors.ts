import {NameSpace} from '../../const';
import {State} from '../../types/state';

function getCity(state: Pick<State, NameSpace.App>): string {
  return state[NameSpace.App].city;
}

export {
  getCity
};
