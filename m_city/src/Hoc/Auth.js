import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase';
import { getAuth } from 'firebase/auth';

const AuthGuard = (Component) => {
  class AuthHoc extends React.Component {
    authCheck = () => {
      const user = getAuth(firebase).currentUser;
      if (user) {
        return <Component {...this.props} />;
      } else {
        return <Redirect to="/" />;
      }
    };

    render() {
      return this.authCheck();
    }
  }

  return AuthHoc;
};

export default AuthGuard;
