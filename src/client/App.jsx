import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import routes from './containers/routes';
import GlobalFeed from './GlobalFeed';
// import Signin from './components/signin';
import Signup from './components/signup';

export default function App() {
  console.log('Made it to App');
  return (
    <BrowserRouter>
      <Route exact path="/" component={GlobalFeed} />
      <Route path="/signup" component={Signup} />
      {/* <Route path="/signin" component={Signin} /> */}
    </BrowserRouter>
  );
}

// export default (
//   <BrowserRouter>
//     <Route exact path="/" component={GlobalFeed} />
//     <Route path="/signup" component={Signup} />
//     <Route path="/signin" component={Signin} />
//   </BrowserRouter>
// );
