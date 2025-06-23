import {OFFERS_COUNT, Settings} from './const';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {OFFERS_COUNT}
      offersPerPage = {Settings.OffersPerPage}
    />
  </React.StrictMode>
);
