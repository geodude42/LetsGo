import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from './containers/routes';

function App() {
  return (
    <BrowserRouter>
      <Route routes={routes} />
    </BrowserRouter>
  );
}

export default App;
