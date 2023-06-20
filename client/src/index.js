import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import apiStore from './redux/apiStore';
import { Provider } from "react-redux";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={apiStore}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

