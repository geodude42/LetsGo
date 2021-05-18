import React from 'react';
import { Route } from 'react-router-dom';

import Signin from '../components/signin';
import Signup from '../components/signup';
import GlobalFeed from '../GlobalFeed';

export default (
  <div>
    <Route exact path="/" component={GlobalFeed} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
  </div>
);
