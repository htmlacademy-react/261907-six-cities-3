import {store} from '../store';
import {setErrorAction} from '../store/action';
import {clearErrorAction} from '../store/api-action';

function processErrorHandle (errorMessage: string): void {
  store.dispatch(setErrorAction({error: errorMessage}));
  store.dispatch(clearErrorAction());
}

export {processErrorHandle};
