import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Dominus} from "./Dominus";

// eslint-disable-next-line functional/no-expression-statement
ReactDOM.render(
  <React.StrictMode>
      <Dominus/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// eslint-disable-next-line functional/no-expression-statement
serviceWorker.unregister();
