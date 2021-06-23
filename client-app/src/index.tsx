import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { Router } from 'react-router-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history';
import { store, StoreContext } from './app/stores/store';
import 'react-datepicker/dist/react-datepicker.css';

export const history = createBrowserHistory();


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
