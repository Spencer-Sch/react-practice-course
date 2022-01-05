import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Header from './Components/Header_footer/Header';
import Footer from './Components/Header_footer/Footer';
import Home from './Components/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
