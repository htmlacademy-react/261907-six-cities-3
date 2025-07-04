import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './component/app/app';
import ServerErrorNote from './component/server-error-note/server-error-note';
import {checkAuthorizationAction, getOffersAction} from './store/api-action';

store.dispatch(getOffersAction());
store.dispatch(checkAuthorizationAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ServerErrorNote />
      <App />
    </Provider>
  </React.StrictMode>
);
