import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css';
import { firebase } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Routes from './routes';

const App = (props) => {
  return <Routes {...props} />;
};

const auth = getAuth(firebase);

onAuthStateChanged(auth, (user) => {
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
});
