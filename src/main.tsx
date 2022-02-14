import '@/common/css/tailwindcss.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { CreateRouter } from './router';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CreateRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
