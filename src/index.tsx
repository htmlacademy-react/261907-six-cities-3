import {reviews} from './mocks/reviews';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './component/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
