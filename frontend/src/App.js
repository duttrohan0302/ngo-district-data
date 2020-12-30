import React from 'react';
import Routes from './Routing/Routes';
import { history } from './Helpers';
import { Router,Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Helpers/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './Utils/setAuthToken';
import { loadUser,logout } from './Actions/authActions';

console.log(localStorage.getItem('jwtToken'))
// Check for token
if (localStorage.jwtToken) {
  console.log("App.js func called")
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(loadUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp > currentTime) {
    // Logout user
    store.dispatch(logout());

    // Redirect to home
    window.location.href = "/";
  }
}

const App = () => {
  
  return (
      <Provider store={store}>
        <Router history={history}>
            <Switch>
              <Route component = {Routes} />
            </Switch>
        </Router>
      </Provider>
  );
}

export default App;
