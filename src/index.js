import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { save, load } from 'redux-localstorage-simple';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import locationApp from './reducers';

const persistStates = ['locations', 'baseLocation'];
const createStoreWithMiddleware = applyMiddleware(
  save({
    states: persistStates,
  })
)(createStore);

let store = createStoreWithMiddleware(
  locationApp,
  load({
    states: persistStates,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
