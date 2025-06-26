import {OFFERS_COUNT, Setting} from './const';
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
      offersPerPage = {Setting.OffersPerPage}
    />
  </React.StrictMode>
);
