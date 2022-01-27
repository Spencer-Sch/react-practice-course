import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/Header';
import Footer from './Components/Header_footer/Footer';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/TheMatches';
import NotFound from './Components/NotFound/NotFound';

import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/Players';
import AddEditPlayers from './Components/Admin/Players/addEditPlayers';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatches from './Components/Admin/Matches/addEditMatch';

const Routes = ({ user }) => {
  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        {/* Admin Matches routes */}
        <Route
          path="/admin_matches/edit_match/:matchid"
          component={AuthGuard(AddEditMatches)}
        />
        <Route
          path="/admin_matches/add_match"
          component={AuthGuard(AddEditMatches)}
        />
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)} />
        {/* Admin Players routes */}
        <Route
          path="/admin_players/edit_player/:playerid"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path="/admin_players/add_player"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)} />
        {/* Other Navbar routes */}
        <Route path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route path="/the_matches" component={TheMatches} />
        <Route path="/the_team" component={TheTeam} />
        <Route
          path="/sign_in"
          component={(props) => <SignIn {...props} user={user} />}
        />
        {/* Home route */}
        <Route path="/" exact component={Home} />
        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
