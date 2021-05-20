import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import routes from './containers/routes';
import GlobalFeed from './GlobalFeed';
import Signin from './components/signin';
import Signup from './components/signup';
import AuthContext from './components/contexts/Auth-context';

export default function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <AuthContext.Provider value={providerUser}>
      <BrowserRouter>
        <Route exact path="/" component={GlobalFeed} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
