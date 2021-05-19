import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import App from './App';

console.log('index opened');

render(
  <App />,
  document.getElementById('main'),
);
