import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import {store} from './store';
import {checkAuthorizationAction, getOffersAction} from './store/api-action';
import browserHistory from './browser-history';
import HistoryRoute from './component/history-route/history-route';
import App from './component/app/app';

store.dispatch(getOffersAction());
store.dispatch(checkAuthorizationAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>
);
