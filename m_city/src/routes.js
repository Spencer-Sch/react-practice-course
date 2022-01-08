import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header_footer/Header';
import Footer from './Components/Header_footer/Footer';
import Home from './Components/Home';
import SignIn from './Components/SignIn';

const Routes = ({ user }) => {
  console.log(user);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
