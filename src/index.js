import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';
import LoginControllerWrapper from './components/login/LoginControllerWrapper';
import LoginControllerDefault from './components/login/LoginControllerDefault';
import SpringBootAdapterWrapper from './util/SpringBootAdapterWrapper';
import SpringBootAdapterDefault from './util/SpringBootAdapterDefault';
dotenv.config();

LoginControllerWrapper.setController(LoginControllerDefault);
SpringBootAdapterWrapper.setAdapter(SpringBootAdapterDefault);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
