import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import {store} from './store';
import App from './component/app/app';
import {checkAuthorizationAction, getOffersAction} from './store/api-action';

store.dispatch(getOffersAction());
store.dispatch(checkAuthorizationAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
