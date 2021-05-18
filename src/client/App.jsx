import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalFeed from './GlobalFeed';

function App() {
  return (
    <BrowserRouter>
      <GlobalFeed />
    </BrowserRouter>
  );
}

export default App;
